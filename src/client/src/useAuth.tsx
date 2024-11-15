import axios from "axios";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

// Autentikációs kontextus típusdefiníció
interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null | undefined;
    setTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

// Az autentikációs kontextus inicializálása
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Axios példány konfigurálása
const API = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Ellenőrizzük, hogy van-e accessToken a localStorage-ben, amikor az alkalmazás betölt
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            console.log("[AuthProvider] Access token found in localStorage. Setting token state.");
            setToken(accessToken);
            setIsAuthenticated(true); // Ha van token, akkor be van jelentkezve
        } else {
            console.log("[AuthProvider] No access token found in localStorage.");
        }
    }, []);

    // Beállítja a tokeneket és elmenti őket a localStorage-ba
    const setTokens = (accessToken: string, refreshToken: string) => {
        console.log("[AuthProvider] Setting access and refresh tokens in localStorage.");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(accessToken);
        setIsAuthenticated(true);
    };

    // Kijelentkezteti a felhasználót és törli a tokeneket
    const logout = () => {
        console.log("[AuthProvider] Logging out user and removing tokens from localStorage.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setIsAuthenticated(false);
    };

    // Kérés interceptor - Bearer token hozzáadása
    useLayoutEffect(() => {
        const authInterceptor = API.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log("[AuthProvider] Authorization header added with token:", token);
            } else {
                console.log("[AuthProvider] No token available for Authorization header.");
            }
            return config;
        });
    
        return () => {
            API.interceptors.request.eject(authInterceptor);
        };
    }, [token]);
    
    // Válasz interceptor - Token frissítés hibakezelés esetén
    useEffect(() => {
        console.log("REFRESH INTERCEPTOR TRIGGERED");
        const refreshInterceptor = API.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                console.log("[AuthProvider] Response interceptor triggered with error:", error);
    
                // Ellenőrizzük, hogy a 401 státuszkódot megkapta-e, vagy a "Unauthorized" üzenetet
                if (error.response?.status === 401 || error.response?.data?.message === "Unauthorized") {
                    console.log("[AuthProvider] Token expired or unauthorized. Attempting to refresh token.");
                    originalRequest.retryRequest = true;
    
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        console.log("[AuthProvider] Refresh token retrieved:", refreshToken);
    
                        if (!refreshToken) {
                            console.log("[AuthProvider] No refresh token available. Logging out user.");
                            logout();
                            return Promise.reject(error);
                        }
    
                        const response = await API.post(
                            "/auth/refresh", 
                            {},
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${refreshToken}`
                                }
                            }
                        );
    
                        console.log("[AuthProvider] Token refresh successful. Updating tokens with new accessToken:", response.data.accessToken);
    
                        setTokens(response.data.accessToken, response.data.refreshToken);
    
                        // Eredeti kérés újraküldése az új accessToken-nel
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                        return API(originalRequest);  // Az eredeti kérés újraküldése
                    } catch (refreshError) {
                        console.log("[AuthProvider] Token refresh failed. Logging out user.", refreshError);
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    
        return () => {
            API.interceptors.response.eject(refreshInterceptor);
        };
    }, [token]);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setTokens, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { API };

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
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

// Második Axios példány létrehozása a tokenfrissítéshez
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

// AuthProvider implementáció
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Ellenőrizzük, hogy van-e accessToken a localStorage-ben, amikor az alkalmazás betölt
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            console.log("[AuthProvider] Access token found in localStorage. Setting token state.");
            setToken(accessToken);
            setIsAuthenticated(true);
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

    // Ha változik a token, akkor frissítjük az Authorization headert
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

    useLayoutEffect(() => {
      axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 403) {
                const refreshToken = localStorage.getItem("refreshToken");
                console.log("ÚJ REFRESH TOKEN KÉRÉS ITT!!!!!");
    
                if (refreshToken) {
                    try {
                        // Refresh token API call
                        const response = await axios.post(
                            "http://localhost:8080/api/auth/refresh-token",
                            { refreshToken },
                            {
                                headers: { "Content-Type": "application/json" },
                            }
                        );
    
                        // A válaszban lévő 'token' mezőt kezeljük accessToken-ként
                        const newAccessToken = response.data.token; // A szerver válaszában 'token' mező
                        console.log(newAccessToken + " ÚJ TOKEN ITT MOST!!!!!");
    
                        if (newAccessToken) {
                            localStorage.setItem("accessToken", newAccessToken);
    
                            // Retry the original request with the new token
                            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axiosInstance.request(error.config);
                        } else {
                            console.error("Refresh token response did not contain a new token.");
                        }
                    } catch (refreshError) {
                        console.error("Error refreshing token:", refreshError);
                        // Handle logout or other necessary actions here
                    }
                } else {
                    console.error("No refresh token available.");
                }
            }
            return Promise.reject(error);
        }
    );    
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setTokens, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { API, axiosInstance };

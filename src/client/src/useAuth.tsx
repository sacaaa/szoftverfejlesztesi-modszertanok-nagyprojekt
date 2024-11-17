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

    // Request interceptor - Authorization header frissítése
    useEffect(() => {
        const authInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const currentToken = localStorage.getItem("accessToken");
                if (currentToken) {
                    config.headers.Authorization = `Bearer ${currentToken}`;
                    console.log("[AuthProvider] Authorization header updated with token:", currentToken);
                } else {
                    console.log("[AuthProvider] No token available for Authorization header.");
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    
        return () => {
            axiosInstance.interceptors.request.eject(authInterceptor);
        };
    }, [token]); // A token állapotára figyelünk
    

    // Response interceptor - Token frissítés 403-as hiba esetén
    useLayoutEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 403 && !error.config._retry) {
                    error.config._retry = true; // Végtelen ciklus elkerülése
    
                    const refreshToken = localStorage.getItem("refreshToken");
                    console.log("ÚJ REFRESH TOKEN KÉRÉS ITT!!!!!");
    
                    if (refreshToken) {
                        try {
                            const response = await axios.post(
                                "http://localhost:8080/api/auth/refresh-token",
                                { refreshToken },
                                { headers: { "Content-Type": "application/json" } }
                            );
    
                            const newAccessToken = response.data.token; // A szerver válaszában 'token' mező
                            console.log(newAccessToken + " ÚJ TOKEN ITT MOST!!!!!");
    
                            if (newAccessToken) {
                                // Új token mentése
                                localStorage.setItem("accessToken", newAccessToken);
    
                                // Fontos: az eredeti kérés fejlécének közvetlen frissítése!
                                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
    
                                // Új tokennel újrapróbáljuk az eredeti kérést
                                return axiosInstance.request(error.config);
                            } else {
                                console.error("Refresh token response did not contain a new token.");
                            }
                        } catch (refreshError) {
                            console.error("Error refreshing token:", refreshError);
                            logout(); // Kijelentkeztetés sikertelen frissítés esetén
                        }
                    } else {
                        console.error("No refresh token available.");
                        logout(); // Logout, ha nincs refresh token
                    }
                }
    
                // Más hibák továbbítása
                return Promise.reject(error);
            }
        );
    
        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setTokens, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { API, axiosInstance };

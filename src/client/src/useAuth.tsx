import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Ellenőrizzük, hogy van-e accessToken a localStorage-ben, amikor az alkalmazás betölt
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsAuthenticated(true); // Ha van token, akkor be van jelentkezve
        }
    }, []);

    const setTokens = (accessToken: string, refreshToken: string) => {
        // Elmentjük a tokeneket a localStorage-be
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true); // Beállítjuk, hogy be van jelentkezve
    };

    const logout = () => {
        // Kijelentkeztetjük a felhasználót és töröljük a tokeneket
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false); // Nincs többé bejelentkezve
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setTokens, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

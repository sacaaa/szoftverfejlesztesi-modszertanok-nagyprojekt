export const decodeToken = (token: string): { email?: string } | null => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Középső rész a payload
        return payload;
    } catch (error) {
        console.error("[decodeToken] Failed to decode token:", error);
        return null;
    }
};

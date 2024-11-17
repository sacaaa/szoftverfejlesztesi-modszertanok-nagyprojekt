import React, { useEffect } from "react";
import { axiosInstance } from "../../../useAuth"; // Importáld az interceptoros Axios példányt

const UserProfile: React.FC = () => {
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Token lekérése a localStorage-ból
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    console.error("No token found in localStorage");
                    return;
                }

                // Token dekódolása és az ID kiolvasása
                const base64Payload = token.split(".")[1];
                const decodedPayload = JSON.parse(atob(base64Payload)); // Token payload dekódolása
                const userId = decodedPayload.sub; // Feltételezve, hogy az 'id' a 'sub'-ban van

                if (!userId) {
                    console.error("User ID not found in token");
                    return;
                }

                // API hívás az ID alapján az axiosInstance használatával
                const response = await axiosInstance.get(`/api/users/1`);

                console.log("User Data:", response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    return <div>Check the console for user data!</div>;
};

export default UserProfile;

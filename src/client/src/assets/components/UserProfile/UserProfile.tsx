import React, { useEffect, useState } from "react";
import { API } from "../../../useAuth";
import { useAuth } from "../../../useAuth";
import { decodeToken } from "./jwtDecode"; // Importálás a dekódoló funkció

interface User {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Hozzáférés a tokenhez a kontextusból

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setError("No token available. Please log in.");
                setLoading(false);
                return;
            }

            const decoded = decodeToken(token);
            const email = decoded?.email;

            if (!email) {
                setError("No email found in token.");
                setLoading(false);
                return;
            }

            try {
                console.log("[UserProfile] Fetching user data for email:", email);
                const response = await API.get(`/users/${email}`); // Dinamikus email használata az URL-ben
                console.log("[UserProfile] User data fetched successfully:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("[UserProfile] Error fetching user data:", error);
                setError("Failed to fetch user data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default UserProfile;

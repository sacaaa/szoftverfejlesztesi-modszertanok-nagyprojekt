import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "./useAuth"; // Importáld a useAuth hook-ot

const Signin = () => {
    const API = axios.create({
        baseURL: "http://localhost:3333",
        withCredentials: true
    });

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/protected";

    const { setTokens } = useAuth(); // Használd a setAuth funkciót a hitelesítési állapot frissítéséhez

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await API.post("/auth/local/signin", { email, password });
            
            if (response?.data?.accessToken && response?.data?.refreshToken) {
                setTokens(response.data.accessToken, response.data.refreshToken);

                navigate(from, { replace: true });
            } else {
                console.log("incorrect submission");
                setError(response?.data.message);
            }
        } catch (err: any) {
            if (!err?.response) {
                setError("Network Error");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                <button type="submit">Sign In</button> {/* A submit gomb */}
            </form>

        </div>
    );
};
export default Signin;

import React, { useState } from 'react';
import './LoginComponent.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../useAuth';

const LoginComponent: React.FC = () => {

    const API = axios.create({
        baseURL: "http://localhost:3333",
        withCredentials: true
    });

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const { setTokens } = useAuth(); // Használd a setAuth funkciót a hitelesítési állapot frissítéséhez

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/protected";

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
                console.log(error);
            } else {
                setError("Login failed");
                console.log(error);
            }
        }
    };

return (
    <div className="login-container">
        <h1 className='login-h1'>EDUSTATS</h1>
        <h2 className='login-h2'>Bejelentkezés</h2>
        <form className="login-form"  onSubmit={handleSubmit}>
            <div className="login-input-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmailValue(e.target.value);
                        setEmail(e.target.value);
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                />
                <label className={`login-placeholder ${emailFocused || emailValue ? 'login-focused' : ''}`}>
                    Email cím
                </label>
            </div>
            <div className="login-input-container">
                <input
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPasswordValue(e.target.value);
                        setPassword(e.target.value);
                    }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                />
                <label className={`login-placeholder ${passwordFocused || passwordValue ? 'login-focused' : ''}`}>
                    Jelszó
                </label>
            </div>
            <div className="login-remember-container">
                <input type="checkbox" id="login-rememberMe" />
                <label htmlFor="login-rememberMe">Belépési adatok megjegyzése</label>
            </div>
                <button type="submit" className='login-button'>BEJELENTKEZÉS</button>
                <p className='login-p'>
                    Nincs még regisztrálva felhasználód? <a href="/register" className='login-a'>Regisztrálok!</a>
                </p>
        </form>
        </div>
    );
};

export default LoginComponent;

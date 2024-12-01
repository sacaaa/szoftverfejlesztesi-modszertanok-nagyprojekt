import React, { useState } from 'react';
import './LoginComponent.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

const LoginComponent: React.FC = () => {

    const API = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true
    });

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState(''); // Használd a setAuth funkciót a hitelesítési állapot frissítéséhez

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await API.post("/api/auth/login", { username, password });
            
            if (response?.data?.token && response?.data?.refreshToken) {

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
            <h2 className='login-h2'>{t('login')}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-container">
                    <input
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUsernameValue(e.target.value);
                            setUsername(e.target.value);
                        }}
                        onFocus={() => setUsernameFocused(true)}
                        onBlur={() => setUsernameFocused(false)}
                        required
                    />
                    <label className={`login-placeholder ${usernameFocused || usernameValue ? 'login-focused' : ''}`}>
                    {t('username')}
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
                        {t('password')}
                    </label>
                </div>
                <div className="login-remember-container">
                    <input type="checkbox" id="login-rememberMe" />
                    <label htmlFor="login-rememberMe" className='login-rememberMe'>{t('Remember_login_credentials')}</label>
                </div>
                <button type="submit" className='login-button'>{t('LOGIN')}</button>
                <p className='login-p'>
                    {t('no_reg')} <a href="/register" className='login-a'>{t('sign_up!')}</a>
                </p>
            </form>
        </div>
    );
};

export default LoginComponent;

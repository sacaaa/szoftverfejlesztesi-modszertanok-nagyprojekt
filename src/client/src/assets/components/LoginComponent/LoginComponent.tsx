import React, { useState } from 'react';
import './LoginComponent.css';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const LoginComponent: React.FC = () => {
    const API = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true
    });

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await API.post('/api/auth/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const { refreshToken, token } = response.data;

                // Mentés localStorage-ba
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('token', token);

                // Átirányítás a főoldalra vagy dashboard-ra
                navigate('/'); // Módosítsd a céloldalt, ha szükséges
            } else {
                setError(t('login_failed'));
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(t('login_failed'));
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-h1">EDUSTATS</h1>
            <h2 className="login-h2">{t('login')}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-container">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
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
                        onChange={(e) => {
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
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">{t('LOGIN')}</button>
                <p className="login-p">
                    {t('no_reg')} <a href="/register" className="login-a">{t('sign_up!')}</a>
                </p>
            </form>
        </div>
    );
};

export default LoginComponent;

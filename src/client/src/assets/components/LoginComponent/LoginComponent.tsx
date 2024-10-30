import React, { useState } from 'react';
import './LoginComponent.css';

const LoginComponent: React.FC = () => {
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

return (
    <div className="login-container">
        <h1 className='login-h1'>EDUSTATS</h1>
        <h2 className='login-h2'>Bejelentkezés</h2>
        <form className="login-form">
            <div className="login-input-container">
                <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
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
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
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

import React, { useState } from 'react';
import './RegisterComponent.css';

const RegisterComponent: React.FC = () => {
    const [form, setForm] = useState({
        category: '',
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        termsAccepted: false,
        subscribeNewsletter: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <div className="register-container">
            <h1 className="register-title">EDUSTATS</h1>
            <h2 className="register-subtitle">Regisztráció</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
                    placeholder="Vezetéknév" 
                    className="register-input" 
                    required 
                />
                <input 
                    type="text" 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleChange} 
                    placeholder="Keresztnév" 
                    className="register-input" 
                    required 
                />
                <input 
                    type="date" 
                    name="birthDate" 
                    value={form.birthDate} 
                    onChange={handleChange} 
                    placeholder="Születési dátum" 
                    className={`register-input ${form.birthDate ? 'register-input-black' : 'register-input-gray'}`}
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="register-input" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    placeholder="Jelszó" 
                    className="register-input" 
                    required 
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={form.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Jelszó ismét" 
                    className="register-input" 
                    required 
                />
                <div className="register-checkbox-container">
                    <label className="register-checkbox-label">
                        <input 
                            type="checkbox" 
                            name="termsAccepted" 
                            checked={form.termsAccepted} 
                            onChange={handleChange} 
                            className="register-checkbox" 
                            required 
                        />
                        Elfogadom a szabályzatot
                    </label>
                    <label className="register-checkbox-label">
                        <input 
                            type="checkbox" 
                            name="subscribeNewsletter" 
                            checked={form.subscribeNewsletter} 
                            onChange={handleChange} 
                            className="register-checkbox" 
                        />
                        <p>Feliratkozom a hírlevélre, hogy kapjak értesítést a legújabb termékekről és ajánlatokról</p>
                    </label>
                </div>
                <button type="submit" className="register-button">REGISZTRÁCIÓ</button>
                <p className="register-footer">
                    Van már felhasználód? <a href="#" className="register-link">Jelentkezz be!</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterComponent;

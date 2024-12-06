import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css';

const RegisterComponent: React.FC = () => {
    const [form, setForm] = useState({
        category: 'student', // Default category for "student"
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        termsAccepted: false,
        subscribeNewsletter: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setErrorMessage(t('password_mismatch'));
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: form.category,
                    username: form.email.split('@')[0], // Username derived from email
                    password: form.password,
                    email: form.email,
                    role: 'STUDENT',
                    firstName: form.firstName,
                    lastName: form.lastName,
                    birthDate: new Date().toISOString().split('T')[0],
                    school: { id: 1, type: 'school' }, // Hardcoded school data
                    schoolId: 1, // Hardcoded school ID
                }),
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data); // "User registered successfully"
                navigate('/login');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || t('registration_failed'));
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage(t('registration_failed'));
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">EDUSTATS</h1>
            <h2 className="register-subtitle">{t('register')}</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder={t('lastname')}
                    className="register-input"
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder={t('firstname')}
                    className="register-input"
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
                    placeholder={t('password')}
                    className="register-input"
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder={t('password_again')}
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
                        {t('accept_terms')}
                    </label>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="register-button">{t('REGISTER')}</button>
                <p className="register-footer">
                    {t('have_account')} <a href="/login" className="register-link">{t('sign_in')}</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterComponent;

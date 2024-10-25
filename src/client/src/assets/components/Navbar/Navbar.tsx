import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language || 'hu');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setSelectedLanguage(i18n.language || 'hu');
    }, [i18n.language]);

    const selectLanguage = (lang: string) => {
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo-container">
                <a href="/" className="navbar-logo-text">EDUSTATS</a>
            </div>

            <div className="navbar-links-container">
                <p>{t('teacher')}</p>
                <p>{t('school')}</p>
                <p>{t('about')}</p>
            </div>

            <div className="navbar-actions-container">
                <div className="language-dropdown">
                    <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                        <span className="flag">
                            {selectedLanguage === 'hu' ? <div className="flag-hungary" /> : <div className="flag-english" />}
                        </span>
                        <span className="arrow">▼</span>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => selectLanguage('hu')}>
                                <div className="flag-hungary" /> Hungary
                            </li>
                            <li onClick={() => selectLanguage('en')}>
                                <div className="flag-english" /> English
                            </li>
                        </ul>
                    )}
                </div>

                <a href="#" className="navbar-login-btn">{t('login')}</a>
                <a href="#" className="navbar-register-btn">{t('register')}</a>
            </div>
        </nav>
    );
};

export default Navbar;

import { useTranslation } from 'react-i18next';
import './Navbar.css';
import { useState } from 'react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('hu');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    const selectLanguage = (lang: string) => {
        setSelectedLanguage(lang);
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar">
            <div className='navbar-logo-container'>
                <a href="/" className='navbar-logo-text'>EDUSTATS</a>
            </div>

            <div className='navbar-links-container'>
                <p className='navbar-links-teacher'>{t('teacher')}</p>
                <p className='navbar-links-school'>{t('school')}</p>
                <p className='navbar-links-about'>{t('about')}</p>
            </div>

            <div className='navbar-actions-container'>
                {/*<div className="-navbar-language-dropdown">
                    <button className="selected-lang" onClick={toggleDropdown}>
                        {selectedLanguage} ▼
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                        <li onClick={() => selectLanguage('HU')}>🇭🇺 Hungarian</li>
                        <li onClick={() => selectLanguage('EN')}>🇬🇧 English</li>
                        </ul>
                    )}
                </div>*/}

                <div className="language-dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <span className="flag">
                        {selectedLanguage === 'hu' ? (
                            <div className="flag-hungary"></div>
                        ) : (
                            <div className="flag-english"></div>
                        )}
                        </span>
                        <span className="arrow">▼</span>
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                        <li onClick={() => selectLanguage('hu')}>
                            <div className="flag-hungary"></div> Hungary
                        </li>
                        <li onClick={() => selectLanguage('en')}>
                            <div className="flag-english"></div> English
                        </li>
                        </ul>
                    )}
                    </div>

                <div className='navbar-login-container'>
                    <a href='#' className='navbar-login-btn'>{t('login')}</a>
                </div>
                <div className='navbar-register-container'>
                    <a href='#' className='navbar-register-btn'>{t('register')}</a>
                </div>
            </div>
        </nav>
        /*<nav>
            <ul>
                <li>{t('teacher')}</li>
                <li>{t('school')}</li>
                <li>{t('about')}</li>
                <li>{t('login')}</li>
                <li>
                    <button onClick={() => changeLanguage('hu')}>HU</button>
                    <button onClick={() => changeLanguage('en')}>EN</button>
                </li>
                <li>
                    <button>{t('register')}</button>
                </li>
            </ul>
        </nav>*/
    );
};

export default Navbar;

import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav>
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
        </nav>
    );
};

export default Navbar;

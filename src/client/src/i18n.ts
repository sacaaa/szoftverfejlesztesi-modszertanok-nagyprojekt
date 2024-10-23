import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "teacher": "Teacher",
            "school": "School",
            "about": "About",
            "login": "Login",
            "register": "Register",
            "description": "This is a text that can be translated into multiple languages."
        }
    },
    hu: {
        translation: {
            "teacher": "Tanár",
            "school": "Iskola",
            "about": "Rólunk",
            "login": "Bejelentkezés",
            "register": "Regisztráció",
            "description": "Ez egy szöveg, amit több nyelvre le lehet fordítani."
        }
    }
};

i18n.use(LanguageDetector).use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;

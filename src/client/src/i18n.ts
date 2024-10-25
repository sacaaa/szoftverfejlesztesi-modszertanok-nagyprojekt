import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "teacher": "Teacher",
            "teacher_search": "Teacher search",
            "school": "School",
            "school_search": "School search",
            "about": "About",
            "rating": "Rating",
            "login": "Login",
            "register": "Register",
            "description": "This is a text that",
            "welcome": "Welcome to the Edustats website!",
            "homepagecontent_p": "Here you can easily search for schools and teachers to find the best one for you. Share your experiences with others: rate the teachers and help the community ensure everyone gets the best education.",
            "rate_your_teachers": "Rate your teachers!"
        }
    },
    hu: {
        translation: {
            "teacher": "Tanár",
            "teacher_search": "Tanár keresés",
            "school": "Iskola",
            "school_search": "Iskola keresés",
            "about": "Rólunk",
            "rating": "Értékelés",
            "login": "Bejelentkezés",
            "register": "Regisztráció",
            "description": "Ez egy szöveg, amit több nyelvre le lehet fordítani.",
            "welcome": "Üdvözlünk az Edustats oldalon!",
            "homepagecontent_p": "Itt könnyedén kereshetsz iskolák és tanárok között, hogy megtaláld a számodra legjobbat. Oszd meg tapasztalataidat másokkal: értékeld a tanárokat és segíts a közösségnek abban, hogy mindenki a legjobb oktatást kapja.",
            "rate_your_teachers": "Értékeld tanáraid!"
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

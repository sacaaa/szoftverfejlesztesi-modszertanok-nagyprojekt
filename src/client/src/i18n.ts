import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    hu: {
        translation: {
            "teacher": "Tanár",
            "teacher_search": "Tanár keresés",
            "school": "Iskola",
            "school_search": "Iskola keresés",
            "about": "Rólunk",
            "about_desc": "Az EduStats egy innovatív online platform, amely lehetőséget kínál diákoknak arra, hogy értékeljék tanáraikat és tantárgyaikat, valamint megoszthassák tapasztalataikat másokkal. Küldetésünk, hogy átláthatóvá és könnyen elérhetővé tegyük a tanárokról és iskolákról szóló információkat, segítve ezzel a diákokat a tudatos választásban, és ösztönözve a tanárokat a folyamatos fejlődésre.",
            "rating": "Értékelés",
            "login": "Bejelentkezés",
            "LOGIN": "BEJELENTKEZÉS",
            "register": "Regisztráció",
            "REGISTER": "REGISZTRÁCIÓ",
            "logout": "Kijelentkezés",
            "description": "Ez egy szöveg, amit több nyelvre le lehet fordítani.",
            "welcome": "Üdvözlünk az Edustats oldalon!",
            "homepagecontent_p": "Itt könnyedén kereshetsz iskolák és tanárok között, hogy megtaláld a számodra legjobbat. Oszd meg tapasztalataidat másokkal: értékeld a tanárokat és segíts a közösségnek abban, hogy mindenki a legjobb oktatást kapja.",
            "rate_your_teachers": "Értékeld tanáraid!",
            "Privacy_Policy": "Adatvédelmi nyilatkozat",
            "Contact": "Kapcsolat",
            "Terms_of_Use": "Felhasználási feltételek",
            "footer_long": "A vélemények tartalmáért az EduStats nem vállal felelősséget. A felhasználók által megosztott információk nem feltétlenül tükrözik az EduStats álláspontját.",
            "username": "Email cím",
            "password": "Jelszó",
            "password_again": "Jelszó ismét",
            "Remember_login_credentials": "Belépési adatok megjegyzése",
            "no_reg": "Nincs még regisztrálva felhasználód?",
            "sign_up!": "Regisztrálok!",
            "lastname": "Vezetéknév",
            "firstname": "Keresztnév",
            "accept_terms": "Elfogadom a szabályzatot",
            "subscribe_newsletter": "Feliratkozom a hírlevélre, hogy kapjak értesítést a legújabb termékekről és ajánlatokról",
            "have_account": "Van már felhasználód?",
            "sign_in": "Jelentkezz be!",
            "search...": "Keresés...",
            "Address": "Cím:",
            "Subjects": "Tantárgyak:",
            "Schools": "Iskolák:",
            "Submit": "Küldés",
            "Excellent": "Kiváló",
            "Good": "Jó",
            "Average": "Közepes",
            "Poor": "Gyenge",
            "Insufficient": "Elégtelen",
            "Details": "Részletek",
            
        }
    },
    en: {
        translation: {
            "teacher": "Teacher",
            "teacher_search": "Teacher search",
            "school": "School",
            "school_search": "School search",
            "about": "About",
            "about_desc": "EduStats is an innovative online platform that enables students to rate their teachers and subjects while sharing their experiences with others. Our mission is to make information about teachers and schools transparent and easily accessible, helping students make informed choices and encouraging teachers to pursue continuous improvement.",
            "rating": "Rating",
            "login": "Login",
            "LOGIN": "LOGIN",
            "register": "Register",
            "REGISTER": "REGISTER",
            "logout": "Logout",
            "description": "This is a text that",
            "welcome": "Welcome to the Edustats website!",
            "homepagecontent_p": "Here you can easily search for schools and teachers to find the best one for you. Share your experiences with others: rate the teachers and help the community ensure everyone gets the best education.",
            "rate_your_teachers": "Rate your teachers!",
            "Privacy_Policy": "Privacy Policy",
            "Contact": "Contact",
            "Terms_of_Use": "Terms of Use",
            "footer_long": "EduStats is not responsible for the content of user reviews. Information shared by users does not necessarily reflect the views of EduStats.",
            "username": "Email",
            "password": "Password",
            "password_again": "Password Again",
            "Remember_login_credentials": "Remember login credentials",
            "no_reg": "Don't have an account yet?",
            "sign_up!": "Sign Up!",
            "lastname": "Last Name",
            "firstname": "First Name",
            "accept_terms": "I accept the terms and conditions",
            "subscribe_newsletter": "Subscribe to the newsletter to receive updates on the latest products and offers",
            "have_account": "Already have an account?",
            "sign_in": "Log In!",
            "search...": "Search...",
            "Address": "Address:",
            "Subjects": "Subjects:",
            "Schools": "Schools:",
            "Submit": "Submit",
            "Excellent": "Excellent",
            "Good": "Good",
            "Average": "Average",
            "Poor": "Poor",
            "Insufficient": "Insufficient",
            "Details": "Details"
        }
    }
};

i18n.use(LanguageDetector).use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'hu',
        interpolation: {
            escapeValue: false
        }
});

export default i18n;

import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <footer className="footer">
            <h3>EDUSTATS</h3>
            <div className="footer-content">
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                <div className="footer-links">
                    <a href="/privacy">{t('Privacy_Policy')}</a>
                    <a href="/contact">{t('Contact')}</a>
                    <a href="/terms">{t('Terms_of_Use')}</a>
                </div>
                <p>{t('footer_long')}</p>
                <p>COPYRIGHT © {new Date().getFullYear()} - www.edustats.hu</p>
            </div>
        </footer>
    );
};

export default Footer;

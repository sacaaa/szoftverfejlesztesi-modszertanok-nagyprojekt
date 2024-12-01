import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
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
                    <a href="/privacy">Adatvédelmi nyilatkozat</a>
                    <a href="/contact">Kapcsolat</a>
                    <a href="/terms">Felhasználási feltételek</a>
                </div>
                <p>A vélemények tartalmáért az EduStats nem vállal felelősséget. A felhasználók által megosztott információk nem feltétlenül tükrözik az EduStats álláspontját.</p>
                <p>COPYRIGHT © {new Date().getFullYear()} - www.edustats.hu</p>
            </div>
        </footer>
    );
};

export default Footer;

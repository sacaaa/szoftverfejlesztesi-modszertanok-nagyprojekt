import { useTranslation } from 'react-i18next';
import './HomePageContent.css';

const HomePageContent = () => {
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
        <header className="homepage-header">
            <h3>{t('welcome')}</h3>
            <h2>{t('rate_your_teachers')}</h2>
            <p>{t('homepagecontent_p')}</p>
        </header>

        <div className="homepage-buttons">
            <button className="search-button">{t('teacher_search')}</button>
            <button className="search-button">{t('school_search')}</button>
        </div>

        <div className="stats-section">
            <div className="stat-card">
            <h3>10.000+</h3>
            <p>{t('teacher')}</p>
            </div>
            <div className="stat-card">
            <h3>154.000+</h3>
            <p>{t('rating')}</p>
            </div>
            <div className="stat-card">
            <h3>500+</h3>
            <p>{t('school')}</p>
            </div>
        </div>

        <section className="about-section" id='about'>
            <h3>{t('about')}</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus turpis, tincidunt tempor nisi nec, ornare rutrum leo. Suspendisse semper vehicula quam. Sed quis condimentum lectus. Donec convallis tristique justo, eu posuere justo congue sed.
            </p>
        </section>
        </div>
    );
};

export default HomePageContent;

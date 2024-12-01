import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HomePageContent.css';

const HomePageContent = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState({ teacherCount: '...', reviewCount: '...', schoolCount: '...' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Adatok betöltése az API-ból
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/data'); // Az API végpont
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    console.error('Failed to fetch stats');
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h3>{t('welcome')}</h3>
                <h2>{t('rate_your_teachers')}</h2>
                <p>{t('homepagecontent_p')}</p>
            </header>

            <div className="homepage-buttons">
                <a href="/teachers" className="search-button">
                    {t('teacher_search')}
                </a>
                <a href="/schools" className="search-button">
                    {t('school_search')}
                </a>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <h3>{loading ? '...' : stats.teacherCount}</h3>
                    <p>{t('teacher')}</p>
                </div>
                <div className="stat-card">
                    <h3>{loading ? '...' : stats.reviewCount}</h3>
                    <p>{t('rating')}</p>
                </div>
                <div className="stat-card">
                    <h3>{loading ? '...' : stats.schoolCount}</h3>
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

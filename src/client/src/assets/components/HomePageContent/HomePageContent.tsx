import './HomePageContent.css';

const HomePageContent = () => {
    return (
        <div className="homepage-container">
        <header className="homepage-header">
            <h3>Üdvözlünk az Edustats oldalon!</h3>
            <h2>Értékeld<br /> tanáraid</h2>
            <p>
            Itt könnyedén kereshetsz iskolák és tanárok között, hogy megtaláld a számodra legjobbat. Oszd meg tapasztalataidat másokkal: értékeld a tanárokat és segíts a közösségnek abban, hogy mindenki a legjobb oktatást kapja.
            </p>
        </header>

        <div className="homepage-buttons">
            <button className="search-button">Tanár keresés</button>
            <button className="search-button">Iskola keresés</button>
        </div>

        <div className="stats-section">
            <div className="stat-card">
            <h3>10.000+</h3>
            <p>Tanár</p>
            </div>
            <div className="stat-card">
            <h3>154.000+</h3>
            <p>Értékelés</p>
            </div>
            <div className="stat-card">
            <h3>500+</h3>
            <p>Iskola</p>
            </div>
        </div>

        <section className="about-section">
            <h3>Rólunk</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus turpis, tincidunt tempor nisi nec, ornare rutrum leo. Suspendisse semper vehicula quam. Sed quis condimentum lectus. Donec convallis tristique justo, eu posuere justo congue sed.
            </p>
        </section>
        </div>
    );
};

export default HomePageContent;

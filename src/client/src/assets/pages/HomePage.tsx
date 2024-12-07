import Footer2 from "../components/Footer2/Footer2";
import Navbar from "../components/Navbar/Navbar";
import HomePageContent from "../components/HomePageContent/HomePageContent";
import './HomePage.css'

const HomePage = () => {
    return (
        <>
        <div className="home-page-container">
            <Navbar />
            <HomePageContent />
            <Footer2 />
        </div>
        </>
    )
}

export default HomePage
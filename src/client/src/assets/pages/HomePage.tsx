import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
//import TextComponent from "../components/Test";
import HomePageContent from "../components/HomePageContent/HomePageContent";
import SchoolsComponent from "../components/Test2";
import TeacherCard from "../components/TeacherCard/TeacherCard";

const HomePage = () => {
    return (
        <>
        <Navbar />
        <HomePageContent />
        <SchoolsComponent />
        <TeacherCard
                name="Székely Dávid Béla"
                rating={4.76}
                subjects={['Matematika', 'Fizika']}
                school="Mechwart András Gépipari és Informatikai középiskola"
                tags={['Debrecen', 'Egyetem', 'Kollégium']}
                profileImage="https://via.placeholder.com/100" // Opcionális URL képhez
            />
        <Footer />
        </>
    )
}

export default HomePage
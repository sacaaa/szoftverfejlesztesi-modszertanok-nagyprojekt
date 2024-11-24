import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import HomePageContent from "../components/HomePageContent/HomePageContent";
import SchoolsComponent from "../components/Test2";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import OpinionForm from "../components/OpinionForm/OpinionForm";
import OpinionComponent from "../components/OpinionComponent/OpinionComponent";
import ExtendedTeacherCard from "../components/ExtendedTeacherCard/ExtendedTeacherCard";
import SimpleTeacherCard from "../components/SimpleTeacherCard/SimpleTeacherCard";
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
        <OpinionForm />
        <OpinionComponent 
                title="Matematika"
                opinion="Nagyon jó tanár, érthetően magyaráz. "
                rating={4.9}
                profileImage="https://via.placeholder.com/100"
        />
        <ExtendedTeacherCard
                name="Andor Dávid Béla"
                rating={4.9}
                additionalInfo={['Debrecen', 'Egyetem', 'Kollégium']}
                logo="https://via.placeholder.com/100" // Opcionális URL képhez
        />
        <SimpleTeacherCard
                name="Kiss Péter"
                rating={4.5}
                additionalInfo={['Debrecen', 'Egyetem', 'Kollégium']}
                logo="https://via.placeholder.com/100" // Opcionális URL képhez
        />
        <Footer />
        </>
    )
}

export default HomePage
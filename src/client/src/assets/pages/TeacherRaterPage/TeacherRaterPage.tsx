import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import OpinionComponent from "../../components/OpinionComponent/OpinionComponent"
import OpinionForm from "../../components/OpinionForm/OpinionForm"
import TeacherCard from "../../components/TeacherCard/TeacherCard"
import SchoolsComponent from "../../components/Test2"

const TeacherRaterPage = () => {
    return (
        <>
        <Navbar />
        <SchoolsComponent />
        <TeacherCard
                name="Székely Dávid Béla"
                rating={4.76}
                subjects={['Matematika', 'Fizika']}
                school="Debreceni SZC Mechwart András Gépipari és Informatikai Technikum"
                tags={['Debrecen', 'Egyetem', 'Kollégium']}
                profileImage="https://via.placeholder.com/100"
            />
        <OpinionForm />
        <OpinionComponent 
                title="Matematika"
                opinion="Nagyon jó tanár, érthetően magyaráz. "
                rating={4.53}
                profileImage="https://via.placeholder.com/100"
        />
        <OpinionComponent 
                title="Matematika"
                opinion="Nagyon jó tanár, érthetően magyaráz. "
                rating={5}
                profileImage="https://via.placeholder.com/100"
        />
        <OpinionComponent 
                title="Matematika"
                opinion="Nagyon jó tanár, érthetően magyaráz. "
                rating={4.23}
                profileImage="https://via.placeholder.com/100"
        />
        <Footer />
        </>
    )
}

export default TeacherRaterPage;
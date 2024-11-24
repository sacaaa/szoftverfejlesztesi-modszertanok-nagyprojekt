// SchoolList.tsx
import React, { useState } from 'react';
import ExtendedTeacherCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleTeacherCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


const TeacherList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    

    const teacherData = {
        name: "Székely Dávid Béla",
        logo: "public/images/svgg.png",
        rating: "4.2",
        additionalInfo: ["Debrecen", "Kollégium", "Egyetem"],
    };

    return (
        <>  
            <Navbar />
            <div className='seach-bar'>
                <SearchBar toggleView={setIsExtended} />
            </div>

            <div className= {!isExtended ? 'main-content' : 'ext-main-content'}>
                <div>
                    {isExtended ? (
                        <ExtendedTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating} 
                            additionalInfo={teacherData.additionalInfo}
                        />
                    ) : (
                        <SimpleTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating} 
                            additionalInfo={teacherData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedTeacherCard 
                            name={teacherData.name}  
                            logo={teacherData.logo} 
                            rating={teacherData.rating}
                            additionalInfo={teacherData.additionalInfo}
                        />
                    ) : (
                        <SimpleTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating} 
                            additionalInfo={teacherData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating}
                            additionalInfo={teacherData.additionalInfo}
                        />
                    ) : (
                        <SimpleTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating} 
                            additionalInfo={teacherData.additionalInfo}
                        />
                    )}
                </div>
                <div>
                    {isExtended ? (
                        <ExtendedTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating}
                            additionalInfo={teacherData.additionalInfo}
                        />
                    ) : (
                        <SimpleTeacherCard 
                            name={teacherData.name} 
                            logo={teacherData.logo} 
                            rating={teacherData.rating} 
                            additionalInfo={teacherData.additionalInfo}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </>

    );
}

export default TeacherList;

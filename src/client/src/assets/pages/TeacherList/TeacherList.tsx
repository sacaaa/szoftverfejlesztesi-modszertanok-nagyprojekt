import React, { useState } from 'react';
import ExtendedTeacherCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleTeacherCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

interface Teacher {
    name: string;
    logo: string;
    rating: string;
    additionalInfo: string[];
}

const TeacherList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const teacherData: Teacher[] = [
        {
            name: "Székely Dávid Béla",
            logo: "public/images/svgg.png",
            rating: "4.2",
            additionalInfo: ["Debrecen", "Kollégium", "Egyetem"],
        },
        {
            name: "Kiss Anna",
            logo: "public/images/svgg.png",
            rating: "4.7",
            additionalInfo: ["Budapest", "Gimnázium"],
        },
        {
            name: "Nagy Péter",
            logo: "public/images/svgg.png",
            rating: "4.0",
            additionalInfo: ["Szeged", "Szakképzés"],
        },
    ];

    const filteredTeachers = teacherData.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.additionalInfo.some(info =>
            info.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>  
            <Navbar />
            <div className='seach-bar'>
                <SearchBar
                    toggleView={setIsExtended}
                    onSearch={(value) => setSearchTerm(value)} // Átadjuk a keresőmező értékét
                />
            </div>

            <div className={!isExtended ? 'main-content' : 'ext-main-content'}>
                {filteredTeachers.map((teacher, index) => (
                    <div key={index}>
                        {isExtended ? (
                            <ExtendedTeacherCard
                                name={teacher.name}
                                logo={teacher.logo}
                                rating={teacher.rating}
                                additionalInfo={teacher.additionalInfo}
                            />
                        ) : (
                            <SimpleTeacherCard
                                name={teacher.name}
                                logo={teacher.logo}
                                rating={teacher.rating}
                                additionalInfo={teacher.additionalInfo}
                            />
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default TeacherList;

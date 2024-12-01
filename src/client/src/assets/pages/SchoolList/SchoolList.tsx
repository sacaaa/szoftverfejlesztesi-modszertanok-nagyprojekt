import React, { useState } from 'react';
import ExtendedSchoolCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleSchoolCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

interface School {
    name: string;
    logo: string;
    rating: string;
    description: string;
    additionalInfo: string[];
}

const SchoolList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const schoolData: School[] = [
        {
            name: "Debreceni Egyetem Informatikai Kar",
            logo: "public/images/svgg.png",
            rating: "4.5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            additionalInfo: ["Debrecen", "Kollégium", "Egyetem"],
        },
        {
            name: "Budapesti Műszaki és Gazdaságtudományi Egyetem",
            logo: "public/images/svgg.png",
            rating: "4.7",
            description: "Kiemelkedő mérnökképzés Magyarországon.",
            additionalInfo: ["Budapest", "Egyetem"],
        },
        {
            name: "Szegedi Tudományegyetem",
            logo: "public/images/svgg.png",
            rating: "4.3",
            description: "Szeged szívében található elismert intézmény.",
            additionalInfo: ["Szeged", "Egyetem"],
        },
    ];

    const filteredSchools = schoolData.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.additionalInfo.some(info =>
            info.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>  
            <Navbar />
            <div className='search-bar'>
                <SearchBar
                    toggleView={setIsExtended}
                    onSearch={(value) => setSearchTerm(value)} // Keresési feltétel átadása
                />
            </div>

            <div className={!isExtended ? 'main-content' : 'ext-main-content'}>
                {filteredSchools.map((school, index) => (
                    <div key={index}>
                        {isExtended ? (
                            <ExtendedSchoolCard
                                name={school.name}
                                logo={school.logo}
                                rating={school.rating}
                                description={school.description}
                                additionalInfo={school.additionalInfo}
                            />
                        ) : (
                            <SimpleSchoolCard
                                name={school.name}
                                logo={school.logo}
                                rating={school.rating}
                                additionalInfo={school.additionalInfo}
                            />
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default SchoolList;

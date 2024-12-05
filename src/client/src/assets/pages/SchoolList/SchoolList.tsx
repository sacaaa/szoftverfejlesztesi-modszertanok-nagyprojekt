import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExtendedSchoolCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleSchoolCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

interface School {
    id: number;
    name: string;
    rating: number; // Az értékelés átlagolásához
    description: string;
    additionalInfo: string[];
}

const SchoolList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [schoolData, setSchoolData] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Navigáció a React Router-rel

    useEffect(() => {
        // Iskolák adatainak betöltése az API-ból
        const fetchSchools = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/schools');
                if (response.ok) {
                    const data = await response.json();
                    // Az adatok átalakítása a kívánt formátumra
                    const formattedData = data.map((school: any) => ({
                        id: school.id,
                        name: school.name,
                        rating: calculateAverageRating(school.teachers),
                        description: school.description,
                        additionalInfo: [
                            `${school.address.street}, ${school.address.city}, ${school.address.country}`
                        ],
                    }));
                    setSchoolData(formattedData);
                } else {
                    console.error('Failed to fetch schools.');
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    // Átlagos értékelés kiszámítása
    const calculateAverageRating = (teachers: any[]) => {
        if (!teachers || teachers.length === 0) return 0;
        const ratings = teachers
            .filter((teacher) => teacher.avg_rating)
            .map((teacher) => teacher.avg_rating);
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        return (sum / ratings.length).toFixed(1); // Egy tizedesjegy
    };

    const handleCardClick = (id: number) => {
        navigate(`/schools/${id}`); // Navigáció az adott iskola oldalára
    };

    const filteredSchools = schoolData.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.additionalInfo.some(info =>
            info.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            <Navbar />
            <div className="search-bar">
                <SearchBar
                    toggleView={setIsExtended}
                    onSearch={(value) => setSearchTerm(value)}
                />
            </div>

            <div className={!isExtended ? 'main-content' : 'ext-main-content'}>
                {loading ? (
                    <p>Adatok betöltése...</p>
                ) : filteredSchools.length > 0 ? (
                    filteredSchools.map((school) => (
                        <div
                            key={school.id}
                            onClick={() => handleCardClick(school.id)} // Kattintási esemény
                            style={{ cursor: 'pointer' }} // Vizualizáció a kattinthatósághoz
                        >
                            {isExtended ? (
                                <ExtendedSchoolCard
                                    name={school.name}
                                    rating={school.rating.toString()}
                                    description={school.description}
                                    additionalInfo={school.additionalInfo} logo={''}                                />
                            ) : (
                                <SimpleSchoolCard
                                        name={school.name}
                                        rating={school.rating.toString()}
                                        additionalInfo={school.additionalInfo} logo={''}                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-results-message">Nincs találat a keresési feltételek alapján.</p>
                )}
            </div>
        </>
    );
};

export default SchoolList;

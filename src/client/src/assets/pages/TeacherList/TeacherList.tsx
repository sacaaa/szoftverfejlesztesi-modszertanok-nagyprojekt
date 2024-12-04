import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExtendedTeacherCard from '../../components/ExtendedSchoolCard/ExtendedSchoolCard';
import SimpleTeacherCard from '../../components/SimpleSchoolCard/SimpleSchoolCard';
import '../SchoolList/SchoolList.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/Navbar/Navbar';

interface Teacher {
    id: number;
    name: string;
    logo: string; // Logo optional
    rating: number;
    additionalInfo: string[];
}

const TeacherList: React.FC = () => {
    const [isExtended, setIsExtended] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [teacherData, setTeacherData] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Adatok betöltése az API-ról
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/teachers');
                if (response.ok) {
                    const data = await response.json();
                    // Átalakítás a megfelelő formátumra
                    const formattedData = data.map((teacher: any) => ({
                        id: teacher.id,
                        name: `${teacher.title || ''} ${teacher.firstName} ${teacher.lastName}`,
                        logo: 'avatar.png', // Default logo
                        rating: teacher.avg_rating,
                        additionalInfo: teacher.subjectAtSchools.map((subject: any) =>
                            `${subject.subject.name} (${teacher.school_ids.join(', ')})`
                        ),
                    }));
                    setTeacherData(formattedData);
                } else {
                    console.error('Failed to fetch teachers.');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const filteredTeachers = teacherData.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.additionalInfo.some(info =>
            info.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleCardClick = (id: number) => {
        navigate(`/teachers/${id}`);
    };

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
                ) : filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            onClick={() => handleCardClick(teacher.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {isExtended ? (
                                <ExtendedTeacherCard
                                    name={teacher.name}
                                    rating={Math.round(teacher.rating).toString()}
                                    additionalInfo={teacher.additionalInfo}
                                    description="Default description" // Add a description property
                                />
                            ) : (
                                <SimpleTeacherCard
                                    name={teacher.name}
                                    rating={Math.round(teacher.rating).toString()}
                                    additionalInfo={teacher.additionalInfo}
                                />
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

export default TeacherList;

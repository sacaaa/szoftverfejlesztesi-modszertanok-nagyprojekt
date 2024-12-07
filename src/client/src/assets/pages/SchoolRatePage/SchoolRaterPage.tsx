import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SchoolCard from "../../components/SchoolCard/SchoolCard";
import Footer2 from "../../components/Footer2/Footer2";
import './SchoolRaterPage.css'
import TeacherUnderSchoolCard from "../../components/TeacherUnderSchoolCard/TeacherUnderSchoolCard";

interface Teacher {
    id: number;
    subjects: string[];
    avgRating: number;
    name: string;
}


interface School {
    id: number;
    name: string;
    avgRating: number;
    teachers: Teacher[];
    description: string;
    address: string;
}



const SchoolRaterPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState(true);
    const [dataForDownload, setDataForDownload] = useState<{ 
        teacherName: string;
        teacherId: number;
        subjectName: string;
        reviewRating: number;
        reviewDate: string;
    }[]>([])

    const fetchSchool = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/schools/${id}`);
            if (response.ok) {
                const data = await response.json();

                
            
                const teacherDetails: Teacher[] = 
                    data.teachers.map((teacherData: any) => ({
                        id: teacherData.id,
                        subjects: teacherData.subjectAtSchools.map((s: any) => s.subject.name),
                        avgRating: `${teacherData.avg_rating ?? 0}`,
                        name: `${teacherData.title ?? ""} ${teacherData.firstName} ${teacherData.lastName}`,
                        subjectAtSchools: teacherData.subjectAtSchools
                    }));



                console.log("Teacher Data:  ", teacherDetails)         

                const dataForDownload = teacherDetails.flatMap((teacher: any) => {
                    return teacher.subjectAtSchools.flatMap((subject: any) => {
                        return subject.reviewsReceived.map((review: any) => ({
                            teacherName: `${teacher.title} ${teacher.firstName} ${teacher.lastName}`,
                            teacherId: teacher.id,
                            subjectName: subject.subject?.name || "Ismeretlen tantárgy",
                            reviewRating: review.rating,
                            reviewDate: review.createdAt,
                        }));
                    });
                });
                setDataForDownload(dataForDownload)

                const formattedSchool: School = {
                    id: data.id,
                    name: data.name,
                    teachers: teacherDetails,
                    description: data.description,
                    avgRating: data.teachers
                        .filter((t: any) => t.avg_rating > 0) // Szűrjük azokat, akiknek az avg_rating értéke nagyobb, mint 0
                        .reduce((sum: number, t: any) => sum + t.avg_rating, 0) /
                        data.teachers.filter((t: any) => t.avg_rating > 0).length || 0, // Elkerüljük a nullával osztást
                    address: `${data.address.country}, ${data.address.city}, ${data.address.street} ${data.address.houseNumber}`
                }
                setSchool(formattedSchool);

            } else {
                console.error("Failed to fetch school's data");
            }
        } catch (error) {
            console.error("Error fetching school's data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchool();
    }, [id]);

    if (loading) {
        return <p>Adatok betöltése...</p>;
    }

    if (!school) {
        return <h1>Az iskola nem található.</h1>;
    }
 

    return (
        
        <>  
            <div className="school-rater-page-container">
                <Navbar />
                <div className="schoolrater-content-wrap">
                    <SchoolCard
                        name={school.name}
                        rating={school.avgRating}
                        address={school.address}
                        dataForDownload={dataForDownload}
                    />
                    {school.teachers.map((teacher) => (
                    <TeacherUnderSchoolCard
                        key={teacher.id} // Egyedi kulcs
                        id={teacher.id}
                        subjects={teacher.subjects}
                        rating={teacher.avgRating}
                        teacherName={teacher.name}
                    />
                ))}

                </div>
                <Footer2 />
            </div>
        </>
    );
};

export default SchoolRaterPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Footer from "../../components/Footer/Footer";
import OpinionComponent from "../../components/OpinionComponent/OpinionComponent";
import SchoolCard from "../../components/SchoolCard/SchoolCard";
import SchoolOpinionComponent from "../../components/OpinionComponent/SchoolOpinionComponent";

interface Review {
    id: number;
    title: string;
    rating: number;
    studentName: string;
    teacherName: string;
    createdAt: string;
}


interface School {
    id: number;
    name: string;
    avgRating: number;
    teachers: { id: number;  fullName: string}[];
    description: string;
    reviews: Review[];
    address: string;
}



const SchoolRaterPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSchool = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/schools/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched school data:", data);
                
            
                const teacherDetails = await Promise.all(
                    data.teachers.map(async (teacherData: number) => {
                        return {teacherData};
                    })
                );

                const reviewsWithDetails = teacherDetails.flatMap((teacher: any) => 
                    (teacher.teacherData.subjectAtSchools || []).flatMap((subject: any) => 
                        (subject.reviewsReceived || []).map((review: any) => ({
                            id: review.id,
                            title: subject.subject?.name || "Ismeretlen tantárgy",
                            rating: review.rating,
                            createdAt: review.createdAt,
                            teacherName: `${teacher.teacherData.title} ${teacher.teacherData.firstName} ${teacher.teacherData.lastName}`,
                        }))
                    )
                );
                
                console.log("Final Reviews with Details:", reviewsWithDetails);  

                const formattedSchool: School = {
                    id: data.id,
                    name: data.name,
                    teachers: data.teachers.map((t: any) => (
                        {   
                            id: t.id,
                            fullName: `${t.title} ${t.firstName} ${t.lastName}`           
                        })
                    ),
                    description: data.description,
                    avgRating: data.teachers
                        .filter((t: any) => t.avg_rating > 0) // Szűrjük azokat, akiknek az avg_rating értéke nagyobb, mint 0
                        .reduce((sum: number, t: any) => sum + t.avg_rating, 0) /
                        data.teachers.filter((t: any) => t.avg_rating > 0).length || 0, // Elkerüljük a nullával osztást
                    reviews: reviewsWithDetails,
                    address: `${data.address.country}, ${data.address.city}, ${data.address.street} ${data.address.houseNumber}`
                }
                setSchool(formattedSchool);
                console.log(formattedSchool)
                    
                
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
            <Navbar />
            <SchoolCard
                name={school.name}
                rating={school.avgRating}
                teachers={school.teachers}
                address={school.address}
            />
            {school.reviews.map((review) => (
                <SchoolOpinionComponent
                    id={review.id}
                    title={review.title}
                    rating={review.rating}
                    createdAt={review.createdAt}
                    teacherName={review.teacherName}
                />
            ))}
            <Footer />
        </>
    );
};

export default SchoolRaterPage;

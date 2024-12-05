import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import OpinionComponent from "../../components/OpinionComponent/OpinionComponent";
import { useParams } from "react-router-dom";
import OpinionForm from "../../components/OpinionForm/OpinionForm";


interface Review {
    id: number;
    title: string;
    rating: number;
    studentName: string;
    schoolName: string;
    createdAt: string;
}

interface School{
    id: number;
    name: string;
    avgRating: number;
    subjects: string[];
    teachers: { id: number; name: string }[];
    tags: string[];
    subjectAtSchoolIds: number[];
    reviews: Review[];
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

            const teacherDetails = await Promise.all(
                data.teacher_ids.map(async (teacherId: number) => {
                    const teacherResponse = await fetch(`http://localhost:8080/api/teachers/${teacherId}`);
                    const teacherData = await teacherResponse.json();
                    return { id: teacherData.id, name: teacherData.name };
                })
            );

            const reviewsWithDetails = data.subjectAtSchools.flatMap((subjectAtSchool: any) =>
                subjectAtSchool.reviewsReceived.map((review: any) => ({
                    id: review.id,
                    title: subjectAtSchool.subject.name,
                    rating: review.rating,
                    createdAt: review.createdAt,
                    schoolName: teacherDetails.find(s => s.id === subjectAtSchool.schoolId)?.name || 'Ismeretlen oktató',
                }))
            );

            const formattedSchool: School = {
                id: data.id,
                name: `${data.name}`,
                avgRating: data.avg_rating,
                teachers: teacherDetails,
                tags: [],
                reviews: reviewsWithDetails,
                subjectAtSchoolIds: data.subjectAtSchools.map((s: any) => s.id),
                subjects: []
            };

            setSchool(formattedSchool);
        } else {
            console.error("Failed to fetch school's data.");
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
    // return <p>Az iskola nem található</p>;
    return (
        <>
            <Navbar />

            
            <Footer />
        </>
    );
    
}

return (
    <>
        <Navbar />
        {/* <TeacherCard
            name={.name}
            rating={teacher.avgRating}
            subjects={teacher.subjects}
            schools={teacher.schools}
        /> */}
        <OpinionForm
            subjects={school.subjects}
            teacherSubjectIds={school.subjectAtSchoolIds}
            onReviewSubmitted={fetchSchool}
        />
        {school.reviews.map((review) => (
            <OpinionComponent
                key={review.id}
                title={review.title}
                rating={review.rating}
                createdAt={review.createdAt}
                schoolName={review.schoolName}
            />
        ))}
        <Footer />
    </>
);
};



export default SchoolRaterPage;


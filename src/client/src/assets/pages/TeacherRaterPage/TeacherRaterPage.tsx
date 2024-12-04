import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OpinionComponent from "../../components/OpinionComponent/OpinionComponent";
import OpinionForm from "../../components/OpinionForm/OpinionForm";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useParams } from "react-router-dom";

interface Review {
    id: number;
    title: string;
    rating: number;
    studentName: string;
    schoolName: string;
    createdAt: string;
}

interface Teacher {
    id: number;
    name: string;
    avgRating: number;
    subjects: string[];
    schools: { id: number; name: string }[];
    tags: string[];
    subjectAtSchoolIds: number[];
    reviews: Review[];
}

const TeacherRaterPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTeacher = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/teachers/${id}`);
            if (response.ok) {
                const data = await response.json();
    
                const schoolDetails = await Promise.all(
                    data.school_ids.map(async (schoolId: number) => {
                        const schoolResponse = await fetch(`http://localhost:8080/api/schools/${schoolId}`);
                        const schoolData = await schoolResponse.json();
                        return { id: schoolData.id, name: schoolData.name };
                    })
                );
    
                const reviewsWithDetails = data.subjectAtSchools.flatMap((subjectAtSchool: any) =>
                    subjectAtSchool.reviewsReceived.map((review: any) => ({
                        id: review.id,
                        title: subjectAtSchool.subject.name,
                        rating: review.rating,
                        createdAt: review.createdAt,
                        schoolName: schoolDetails.find(s => s.id === subjectAtSchool.schoolId)?.name || 'Ismeretlen iskola',
                    }))
                );
                
                const formattedTeacher: Teacher = {
                    id: data.id,
                    name: `${data.title} ${data.firstName} ${data.lastName}`,
                    avgRating: data.avg_rating,
                    subjects: data.subjectAtSchools.map((s: any) => s.subject.name),
                    schools: schoolDetails,
                    tags: [],
                    reviews: reviewsWithDetails,
                    subjectAtSchoolIds: data.subjectAtSchools.map((s: any) => s.id),
                };
    
                setTeacher(formattedTeacher);
            } else {
                console.error("Failed to fetch teacher data.");
            }
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, [id]);

    if (loading) {
        return <p>Adatok betöltése...</p>;
    }

    if (!teacher) {
        return <p>A tanár nem található.</p>;
    }

    return (
        <>
            <Navbar />
            <TeacherCard
                name={teacher.name}
                rating={teacher.avgRating}
                subjects={teacher.subjects}
                schools={teacher.schools}
            />
            <OpinionForm
                subjects={teacher.subjects}
                teacherSubjectIds={teacher.subjectAtSchoolIds}
                onReviewSubmitted={fetchTeacher}
            />
            {teacher.reviews.map((review) => (
                <OpinionComponent
                    key={review.id}
                    title={review.title}
                    rating={review.rating}
                    createdAt={review.createdAt}
                    schoolName={review.schoolName}
                />
            ))}
        </>
    );
};


export default TeacherRaterPage;
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OpinionComponent from "../../components/OpinionComponent/OpinionComponent";
import OpinionForm from "../../components/OpinionForm/OpinionForm";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useParams } from "react-router-dom";
import './TeacherRaterPage.css';
import Footer2 from "../../components/Footer2/Footer2";

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
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

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
                        schoolName: schoolDetails.find(s => s.id === subjectAtSchool.schoolId)?.name,
                    }))
                );

                reviewsWithDetails.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                const formattedTeacher: Teacher = {
                    id: data.id,
                    name: `${data.title ? data.title + ' ' : ''}${data.lastName} ${data.firstName}`,
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

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = teacher.reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="teacher-rater-page-container">
            <Navbar />
            <div className="content-wrap">
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
                {currentReviews.map((review) => (
                    <OpinionComponent
                        key={review.id}
                        title={review.title}
                        rating={review.rating}
                        createdAt={review.createdAt}
                        schoolName={review.schoolName}
                    />
                ))}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(teacher.reviews.length / reviewsPerPage) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <Footer2 />
        </div>
    );
};

export default TeacherRaterPage;
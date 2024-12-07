import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useTranslation } from 'react-i18next';
import './OpinionForm.css';

interface OpinionFormProps {
    subjects: string[]; // A tanár által tanított tantárgyak listája
    teacherSubjectIds: number[]; // Tantárgyakhoz tartozó azonosítók
    onReviewSubmitted: () => void; // Callback a vélemény frissítéséhez
}

const OpinionForm: React.FC<OpinionFormProps> = ({ subjects, teacherSubjectIds, onReviewSubmitted }) => {
    const [subjectIndex, setSubjectIndex] = useState<number>(0);
    const [rating, setRating] = useState<number>(5);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const getStudentIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            return decoded.studentId || null; // Az extraClaims-ből
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("A vélemény küldéséhez be kell jelentkeznie!");
            navigate('/login');
            return;
        }

        const studentId = getStudentIdFromToken();
        if (!studentId) {
            alert("Érvénytelen token! Jelentkezzen be újra.");
            navigate('/login');
            return;
        }

        const reviewPayload = {
            student: { id: studentId, type: "student" },
            studentId: studentId,
            teacherSubjectAtSchool: { id: teacherSubjectIds[subjectIndex] },
            teacherSubjectAtSchoolId: teacherSubjectIds[subjectIndex],
            rating,
            comment: "",
        };

        try {
            const response = await fetch("http://localhost:8080/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewPayload),
            });

            if (response.ok) {
                alert("Értékelés sikeresen elküldve!");
                onReviewSubmitted();
            } else {
                alert("Hiba történt az értékelés elküldése során.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Hiba történt az értékelés elküldése során.");
        }
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form-controls">
                <select
                    className="review-form-select"
                    value={subjectIndex}
                    onChange={(e) => setSubjectIndex(Number(e.target.value))}
                >
                    {subjects.map((subject, index) => (
                        <option key={index} value={index}>
                            {subject}
                        </option>
                    ))}
                </select>

                <select
                    className="review-form-select rating-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={5}>5 - {t('Excellent')}</option>
                    <option value={4}>4 - {t('Good')}</option>
                    <option value={3}>3 - {t('Average')}</option>
                    <option value={2}>2 - {t('Poor')}</option>
                    <option value={1}>1 - {t('Insufficient')}</option>
                </select>
            </div>

            <button type="submit" className="review-form-submit">
                {t('Submit')}
            </button>
        </form>
    );
};

export default OpinionForm;

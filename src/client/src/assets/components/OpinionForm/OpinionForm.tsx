import React, { useState, useEffect } from 'react';
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
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [lastSubmittedAt, setLastSubmittedAt] = useState<Date | null>(null);
    const cooldownTime = 5 * 60 * 1000; // 5 perc cooldown
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

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

        // Cooldown ellenőrzés
        const now = new Date();
        if (lastSubmittedAt && now.getTime() - lastSubmittedAt.getTime() < cooldownTime) {
            setAlertMessage(`Várjon még ${Math.ceil((cooldownTime - (now.getTime() - lastSubmittedAt.getTime())) / 1000)} másodpercet az újabb vélemény küldéséhez.`);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setAlertMessage("A vélemény küldéséhez be kell jelentkeznie!");
            navigate('/login');
            return;
        }

        const studentId = getStudentIdFromToken();
        if (!studentId) {
            setAlertMessage("Érvénytelen token! Jelentkezzen be újra.");
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
            createdAt: new Date().toISOString()
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
                setAlertMessage("Értékelés sikeresen elküldve!");
                setLastSubmittedAt(new Date()); // Frissítjük az utolsó beküldési időt
                onReviewSubmitted();
            } else {
                setAlertMessage("Hiba történt az értékelés elküldése során.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setAlertMessage("Hiba történt az értékelés elküldése során.");
        }
    };

    return (
        <div>
            {alertMessage && <div className="custom-alert">{alertMessage}</div>}
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
        </div>
    );
};

export default OpinionForm;

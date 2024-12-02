import React, { useState } from 'react';
import './OpinionForm.css';

interface OpinionFormProps {
    subjects: string[]; // A tanár által tanított tantárgyak listája
    teacherSubjectIds: number[]; // Tantárgyakhoz tartozó azonosítók
    onReviewSubmitted: () => void; // Callback a vélemény frissítéséhez
}

const OpinionForm: React.FC<OpinionFormProps> = ({ subjects, teacherSubjectIds, onReviewSubmitted }) => {
    const [subjectIndex, setSubjectIndex] = useState<number>(0); // Az aktuális tantárgy indexe
    const [rating, setRating] = useState<number>(5);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reviewPayload = {
            student: { id: 3, type: "student" }, // Statikus diák adat
            studentId: 3,
            teacherSubjectAtSchool: { id: teacherSubjectIds[subjectIndex] },
            teacherSubjectAtSchoolId: teacherSubjectIds[subjectIndex],
            rating,
            comment: "", // Kommentek nélkül
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
                onReviewSubmitted(); // Frissítjük az értékeléseket
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
                {/* Tantárgy legördülő lista */}
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

                {/* Értékelés legördülő lista */}
                <select
                    className="review-form-select rating-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={5}>5 - Kiváló</option>
                    <option value={4}>4 - Jó</option>
                    <option value={3}>3 - Közepes</option>
                    <option value={2}>2 - Gyenge</option>
                    <option value={1}>1 - Elégtelen</option>
                </select>
            </div>

            <button type="submit" className="review-form-submit">
                Küldés
            </button>
        </form>
    );
};

export default OpinionForm;

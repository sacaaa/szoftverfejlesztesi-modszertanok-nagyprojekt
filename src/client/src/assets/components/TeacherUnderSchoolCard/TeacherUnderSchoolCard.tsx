import React from 'react';
import './TeacherUnderSchoolCard.css';

interface ReviewCardProps {
    id: number;
    subjects: string[]; // Tantárgy neve
    rating: number; // Értékelés
    teacherName: string; // Iskola neve
}

const TeacherUnderSchoolCard: React.FC<ReviewCardProps> = ({id, subjects, rating, teacherName }) => {

    return (
        <div className="review-card">
            <div className="review-card-content">
                <a 
                    href={`/teachers/${id}`} // Dinamikusan generált URL az id alapján
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="review-teacher-school"
                >
                    {teacherName}
                </a>
                <p className="review-subject">{subjects.join(', ')}</p>

            </div>

            <div className="review-rating">
                <p>{Math.round(rating * 100) / 100}</p>
                <span className="rating-star">★</span>
            </div>
        </div>
    );
};

export default TeacherUnderSchoolCard;

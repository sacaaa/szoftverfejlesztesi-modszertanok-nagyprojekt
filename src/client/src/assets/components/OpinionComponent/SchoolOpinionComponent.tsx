import React from 'react';
import './SchoolOpinionComponent.css';

interface ReviewCardProps {
    id: number;
    title: string; // Tantárgy neve
    rating: number; // Értékelés
    createdAt: string; // Vélemény dátuma
    teacherName: string; // Iskola neve
}

const SchoolOpinionComponent: React.FC<ReviewCardProps> = ({id, title, rating, createdAt, teacherName }) => {
    const formattedDate = new Date(createdAt).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
                <p className="review-subject">{title}</p>
                <p className="review-date">{formattedDate || 'N/A'}</p>
            </div>
            <div className="review-rating">
                <p>{rating}</p>
                <span className="rating-star">★</span>
            </div>
        </div>
    );
};

export default SchoolOpinionComponent;

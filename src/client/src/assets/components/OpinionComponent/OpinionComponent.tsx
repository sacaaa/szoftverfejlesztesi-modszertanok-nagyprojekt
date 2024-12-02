import React from 'react';
import './OpinionComponent.css';

interface ReviewCardProps {
    title: string; // Tantárgy neve
    rating: number; // Értékelés
    createdAt: string; // Vélemény dátuma
    schoolName: string; // Iskola neve
}

const OpinionComponent: React.FC<ReviewCardProps> = ({ title, rating, createdAt, schoolName }) => {
    const formattedDate = new Date(createdAt).toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="review-card">
            <div className="review-card-content">
                <h3 className="review-title">{title}</h3>
                <p className="review-school">{schoolName}</p>
                <p className="review-date">{formattedDate || 'N/A'}</p>
            </div>
            <div className="review-rating">
                <p>{rating}</p>
                <span className="rating-star">★</span>
            </div>
        </div>
    );
};

export default OpinionComponent;

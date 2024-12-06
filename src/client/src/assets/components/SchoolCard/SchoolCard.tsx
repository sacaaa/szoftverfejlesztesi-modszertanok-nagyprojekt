import React from 'react';
import './SchoolCard.css';

interface SchoolCardProps {
    name: string;
    rating: number;
    teachers: { id: number; fullName: string }[];
    address: string;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ name, rating, teachers, address }) => {
    const formattedRating = rating !== null && rating !== undefined && !isNaN(rating)
        ? rating.toFixed(2)
        : '0';

    return (
        <div className="school-card">
            <div className="school-card-left">
                {/* Tanár neve */}
                <h2 className="school-name">{name}</h2>
                {/* Értékelés (szám + csillag) */}
                <div className="school-rating">
                    <span>Értékelés:</span>
                    <span className="rating-value">{formattedRating}</span>
                    <span className="rating-star">★</span>
                    
                </div>
                <p className='address'>Cím: {address}</p>
            </div>   
            <div className='download'>
                <span className="download-icon">⬇️</span>
            </div>
        </div>
    );
};


export default SchoolCard;

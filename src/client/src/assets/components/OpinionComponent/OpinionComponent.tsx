import React from 'react';
import './OpinionComponent.css';

interface ReviewCardProps {
    title: string; // A cím (pl. tantárgy neve)
    opinion: string; // A vélemény szövege
    rating: number; // Értékelés (1-5)
    profileImage?: string; // Opcionális profilkép
}

const OpinionComponent: React.FC<ReviewCardProps> = ({ title, opinion, rating, profileImage }) => {
    return (
        <div className="review-card">
            <div className="review-card-left">
                {/* Profilkép vagy helyettesítő ikon */}
                <div className="profile-image">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                    ) : (
                        <div className="placeholder-icon" />
                    )}
                </div>
            </div>
            <div className="review-card-content">
                {/* Cím */}
                <h3 className="review-title">{title}</h3>
                {/* Vélemény */}
                <p className="review-opinion">{opinion}</p>
            </div>
            <div className='review-rating'>
                <p>{rating}</p>
                <span className="rating-star">★</span>
            </div>
        </div>
    );
};

export default OpinionComponent;

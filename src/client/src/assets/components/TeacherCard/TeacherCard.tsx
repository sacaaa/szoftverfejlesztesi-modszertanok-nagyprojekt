import React from 'react';
import './TeacherCard.css';

interface TeacherCardProps {
    name: string;
    rating: number; // Tanár értékelése (1-5 skála)
    subjects: string[]; // Tantárgyak listája
    school: string; // Iskola neve
    tags: string[]; // Címkék (város, extra információk, pl. egyetem)
    profileImage?: string; // Opcionális profilkép URL
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, rating, subjects, school, tags, profileImage }) => {
    return (
        <div className="teacher-card">
            <div className="teacher-card-left">
                {/* Profilkép vagy alapértelmezett ikon */}
                <div className="teacher-profile-image">
                    {profileImage ? (
                        <img src={profileImage} />
                    ) : (
                        <div className="placeholder-icon" />
                    )}
                </div>
                {/* Címkék (pl. város, egyetem, kollégium) */}
                <div className="teacher-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="teacher-tag">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && <span className="teacher-tag more">...</span>}
                </div>
                {/* Tanár neve */}
                <h2 className="teacher-name">{name}</h2>
                {/* Értékelés (szám + csillag) */}
                <div className="teacher-rating">
                    <span>Értékelés:</span>
                    <span className="rating-value">{rating.toFixed(2)}</span>
                    <span className="rating-star">★</span>
                </div>
            </div>
            <div className="teacher-card-right">
                {/* Tantárgyak */}
                <div className="teacher-subjects">
                    <strong>Tantárgyak:</strong>
                    <p>{subjects.join(', ')}</p>
                </div>
                {/* Iskola */}
                <div className="teacher-school">
                    <strong>Iskola:</strong>
                    <p>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            {school}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherCard;

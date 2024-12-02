import React from 'react';
import './TeacherCard.css';

interface TeacherCardProps {
    name: string;
    rating: number; // Tanár értékelése (1-5 skála)
    subjects: string[]; // Tantárgyak listája
    schools: { id: number; name: string }[]; // Iskolák listája, ahol tanít a tanár
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, rating, subjects, schools }) => {
    return (
        <div className="teacher-card">
            <div className="teacher-card-left">
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
                {/* Iskolák */}
                <div className="teacher-schools">
                    <strong>Iskolák:</strong>
                    <div className="school-list">
                        {schools.map((school) => (
                            <a
                                key={school.id}
                                href={`/schools/${school.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="school-link"
                            >
                                {school.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherCard;

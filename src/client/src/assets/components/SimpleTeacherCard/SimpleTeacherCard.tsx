// SimpleSchoolCard.tsx
import React from 'react';
import './SimpleTeacherCard.css';

interface SimpleSchoolCardProps {
    name: string;
    logo: string;
    rating: number;
    additionalInfo: string[];
}

const SimpleTeacherCard: React.FC<SimpleSchoolCardProps> = ({ name, rating, additionalInfo }) => {
    return (
        <div className="simpleteacher-card">
            <div className="simpleteacher-rating1">
                <p>{rating}</p>
                <img src="images/star_purple500.png" alt="star" />
            </div>
            <div className='simpleteacher-additional-info1'> 
                <p>{additionalInfo[0]}</p>
                <p>{additionalInfo[1]}</p>
                <p>{additionalInfo[2]}</p>  
            </div>
            <div className='simpleteacher-info1'>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default SimpleTeacherCard;

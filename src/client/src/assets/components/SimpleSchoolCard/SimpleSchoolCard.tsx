// SimpleSchoolCard.tsx
import React from 'react';
import './SimpleSchoolCard.css';

interface SimpleSchoolCardProps {
    name: string;
    logo: string;
    rating: string;
    additionalInfo: string[];
}

const SimpleSchoolCard: React.FC<SimpleSchoolCardProps> = ({ name, logo, rating, additionalInfo }) => {
    return (
        <div className="school-card">
            <div className="school-rating1">
                <p>{rating}</p>
                <img src="images/star_purple500.png" alt="star" />
            </div>
            <div className='additional-info1'> 
                <p>{additionalInfo[0]}</p>
                <p>{additionalInfo[1]}</p>
                <p>{additionalInfo[2]}</p>  
            </div>
            <div className='school-info1'>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default SimpleSchoolCard;

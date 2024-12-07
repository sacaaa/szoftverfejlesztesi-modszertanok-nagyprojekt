import React from 'react';
import './SimpleSchoolCard.css';

interface SimpleSchoolCardProps {
    name: string;
    rating: string;
    additionalInfo: string[];
}

const SimpleSchoolCard: React.FC<SimpleSchoolCardProps> = ({ name, rating, additionalInfo }) => {
    const limit = 25;
    const truncateInfo = (info: string) => {
        return info.length > limit ? `${info.substring(0, limit)}...` : info;
    };

    return (
        <div className="schooll-card">
            <div className="schooll-rating1">
                <p>{rating}</p>
                <img src="images/star_purple500.png" alt="star" />
            </div>
            <div className='additional-info1'>
                {additionalInfo.map((info, index) => (
                    info && <p key={index}>{truncateInfo(info)}</p>
                ))}
            </div>
            <div className='schooll-info1'>
                <h2>{name}</h2>
            </div>
        </div>
    );
}

export default SimpleSchoolCard;
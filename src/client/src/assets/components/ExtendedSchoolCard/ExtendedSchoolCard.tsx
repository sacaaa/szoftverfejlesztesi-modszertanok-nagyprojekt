import './ExtendedSchoolCard.css'
import { useTranslation } from 'react-i18next';

interface ExtendedSchoolListProps {
    additionalInfo: string[];
    name: string;
    rating: number;
    description: string;
}

export default function Extended_School_Items({ name, rating, description, additionalInfo }: ExtendedSchoolListProps) {
    const { t } = useTranslation();

    return (<>
    <div className="extended-school-card">
        <div className='school-info'>
            <div className='additional-info'>
                {additionalInfo.map((info, index) => (
                    info && <p key={index}>{info}</p>
                ))}
            </div>
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
        <div className='school-right-container'>
            <div className='school-rating'>
                <p>{isNaN(rating) ? 0 : rating}</p>
                <img src={"images/star_purple500.png"} alt={`star`}/>
            </div>
            <a className='more'>
                {t('Details')} -&#62;
            </a>
        </div>
        
    </div>

    </>)
}
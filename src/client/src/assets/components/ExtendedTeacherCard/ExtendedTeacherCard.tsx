import './ExtendedTeacherCard.css'

interface ExtendedSchoolListProps {
    additionalInfo: string[];
    name: string;
    logo: string;
    rating: number;
}

export default function ExtendedTeacherCard({ name, logo, rating, additionalInfo }: ExtendedSchoolListProps) {
    return (<>
    <div className="extended-teacher-card">
        <div className="teacher-logo">
            <img src={logo} alt={`${name} logo`} />
        </div>
        <div className='teacher-info'>
            <div className='teacher-additional-info'>
                <p>{additionalInfo[0]}</p>
                <p>{additionalInfo[1]}</p>
                <p>{additionalInfo[2]}</p>
            </div>
            <h2>{name}</h2>
        </div>
        <div className='teacher-right-container'>
            <div className='teachercard-rating'>
                <p>{rating}</p>
                <img src={"images/star_purple500.png"} alt={`star`}/>
            </div>
            <a className='teacher-more'>
                Részletek -&#62;
            </a>
        </div>
        
    </div>

    </>)
}
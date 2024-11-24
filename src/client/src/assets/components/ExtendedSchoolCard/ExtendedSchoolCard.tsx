import './ExtendedSchoolCard.css'

interface ExtendedSchoolListProps {
    additionalInfo: string[];
    name: string;
    logo: string;
    rating: string;
}

export default function Extended_School_Items({ name, logo, rating, additionalInfo }: ExtendedSchoolListProps) {
    return (<>
    <div className="extended-school-card">
        <div className="school-logo">
            <img src={logo} alt={`${name} logo`} />
        </div>
        <div className='school-info'>
            <div className='additional-info'>
                <p>{additionalInfo[0]}</p>
                <p>{additionalInfo[1]}</p>
                <p>{additionalInfo[2]}</p>
            </div>
            <h2>{name}</h2>
        </div>
        <div className='school-right-container'>
            <div className='school-rating'>
                <p>{rating}</p>
                <img src={"images/star_purple500.png"} alt={`star`}/>
            </div>
            <a className='more'>
                Részletek -&#62;
            </a>
        </div>
        
    </div>

    </>)
}
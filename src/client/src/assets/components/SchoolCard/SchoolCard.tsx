import { useTranslation } from 'react-i18next';
import { MdDownload } from "react-icons/md";
import './SchoolCard.css';

interface SchoolCardProps {
    name: string;
    rating: number;
    address: string;
    dataForDownload: { 
        teacherName: string;
        teacherId: number;
        subjectName: string;
        reviewRating: number;
        reviewDate: string;
    }[];
}

const SchoolCard: React.FC<SchoolCardProps> = ({ name, rating, address, dataForDownload }) => {
    const formattedRating = rating !== null && rating !== undefined && !isNaN(rating)
        ? rating.toFixed(2)
        : '0';
    const { t } = useTranslation();

    // Funkció a CSV fájl generálásához és letöltéséhez
    const downloadCSV = () => {
        // Generáljuk a CSV fájl tartalmát
        const csvContent = [
            // Fejléc
            "teacherName,teacherId,subjectName,reviewRating,reviewDate",
            // Adatok
            ...dataForDownload.map(item =>
                `${item.teacherName},${item.teacherId},${item.subjectName},${item.reviewRating},${item.reviewDate}`
            )
        ].join("\n");

        // Blob létrehozása és URL generálása
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${name}_reviews.csv`);
        link.click();
    };

    return (
        <div className="school-card">
            <div className="school-card-left">
                {/* Iskola neve */}
                <h2 className="school-name">{name}</h2>
                {/* Értékelés (szám + csillag) */}
                <div className="school-rating">
                    <span>{t('rating')}:</span>
                    <span className="rating-value">{formattedRating}</span>
                    <span className="rating-star">★</span>
                </div>
                <p className="address">{t('Address')} {address}</p>
            </div>   
            <div className="download">
                <button onClick={downloadCSV} className="download-icon">
                    <MdDownload /> 
                </button>
            </div>
        </div>
    );
};

export default SchoolCard;

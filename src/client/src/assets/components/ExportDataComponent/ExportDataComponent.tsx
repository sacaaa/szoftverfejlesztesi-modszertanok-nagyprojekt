

interface ExportData{
    studentId: number;
    studentName: string;
    date: string;
    teacherId: number;
    teacherName: string;
    rating: number;
    subjects: string[];
}


const ExportDataComponent: React.FC<ExportData> = ({studentId, date, teacherName, teacherId, rating, subjects, studentName}) => {
    const formattedRating = rating !== null && rating !== undefined && !isNaN(rating)
    ? rating.toFixed(2)
    : '0';



    return(
        <>
        </>
    );
};

export default ExportDataComponent
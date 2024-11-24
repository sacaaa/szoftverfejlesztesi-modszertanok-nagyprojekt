import React, { useState } from 'react';
import './OpinionForm.css';

const OpinionForm: React.FC = () => {
    const [subject, setSubject] = useState<string>('Matematika');
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subject:', subject);
        console.log('Rating:', rating);
        console.log('Comment:', comment);
        alert('Értékelés elküldve!');
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form-controls">
                {/* Tantárgy legördülő lista */}
                <select
                    className="review-form-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value="Matematika">- Matematika</option>
                    <option value="Fizika">- Fizika</option>
                    <option value="Kémia">- Kémia</option>
                    <option value="Biológia">- Biológia</option>
                    <option value="Történelem">- Történelem</option>
                </select>

                {/* Értékelés legördülő lista */}
                <select
                    className="review-form-select rating-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={5}>5 - Kiváló</option>
                    <option value={4}>4 - Jó</option>
                    <option value={3}>3 - Közepes</option>
                    <option value={2}>2 - Gyenge</option>
                    <option value={1}>1 - Elégtelen</option>
                </select>
            </div>

            {/* Vélemény szövegmező */}
            <textarea
                className="review-form-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Írd meg véleményed ide..."
            />

            <button type="submit" className="review-form-submit">
                Küldés
            </button>
        </form>
    );
};

export default OpinionForm;

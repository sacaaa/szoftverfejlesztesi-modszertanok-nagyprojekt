import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    toggleView: (isExtended: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ toggleView }) => {
    const [viewMode, setViewMode] = useState('list');

    const handleViewModeChange = (mode: 'list' | 'grid') => {
        setViewMode(mode);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Keresés..."
                className="search-input"
            />
            <div className="view-toggle">
                <button
                    className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => { handleViewModeChange('list'); toggleView(true); }}
                >
                    📄
                </button>
                <button
                    className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() =>{ handleViewModeChange('grid'); toggleView(false);} }
                >
                    🗂️
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

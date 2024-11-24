import React, { useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import './SearchBar.css';

interface SearchBarProps {
    toggleView: (isExtended: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ toggleView }) => {
    const [viewMode, setViewMode] = useState('grid');

    const handleViewModeChange = (mode: 'list' | 'grid') => {
        setViewMode(mode);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Keresés..."
                className="searchbar-search-input"
            />
            <div className="searchbar-view-toggle">
                <button
                    className={`searchbar-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => { handleViewModeChange('list'); toggleView(true); }}
                >
                    <FaListUl />
                </button>
                <button
                    className={`searchbar-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() =>{ handleViewModeChange('grid'); toggleView(false);} }
                >
                    <IoGridSharp />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

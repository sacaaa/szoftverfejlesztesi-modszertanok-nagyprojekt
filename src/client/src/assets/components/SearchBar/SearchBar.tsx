import React, { useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import './SearchBar.css';

interface SearchBarProps {
    toggleView: (isExtended: boolean) => void;
    onSearch: (value: string) => void; // Új prop a keresési érték átadására
}

const SearchBar: React.FC<SearchBarProps> = ({ toggleView, onSearch }) => {
    const [viewMode, setViewMode] = useState('grid');

    const handleViewModeChange = (mode: 'list' | 'grid') => {
        setViewMode(mode);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value); // Keresési érték átadása
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Keresés..."
                className="searchbar-search-input"
                onChange={handleSearchChange} // Érték változás kezelése
            />
            <div className="searchbar-view-toggle">
                <button
                    className={`searchbar-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => { handleViewModeChange('grid'); toggleView(false); }}
                >
                    <IoGridSharp />
                </button>
                <button
                    className={`searchbar-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => { handleViewModeChange('list'); toggleView(true); }}
                >
                    <FaListUl />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;

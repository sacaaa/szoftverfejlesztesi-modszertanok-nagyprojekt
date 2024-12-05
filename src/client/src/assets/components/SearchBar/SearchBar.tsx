import React, { useState } from 'react';
import { FaListUl } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import './SearchBar.css';

interface SearchBarProps {
    toggleView: (isExtended: boolean) => void;
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ toggleView, onSearch }) => {
    const [viewMode, setViewMode] = useState('grid');
    const { t } = useTranslation();

    const handleViewModeChange = (mode: 'list' | 'grid') => {
        setViewMode(mode);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder={t('search...')}
                className="searchbar-search-input"
                onChange={handleSearchChange}
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

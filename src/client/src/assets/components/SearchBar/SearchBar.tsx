interface SearchBarProps {
    toggleView: (isExtended: boolean) => void;
}

export default function SearchBar({ toggleView }: SearchBarProps) {
    return (
        <div className="search-bar">
            <button onClick={() => toggleView(false)}>Simple</button>
            <button onClick={() => toggleView(true)}>Extended</button>
        </div>
    );
}

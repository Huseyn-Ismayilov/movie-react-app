import { useState } from "react"

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="search_bar">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    onSearch(searchTerm);
                }}
            >
                <input
                    type="text"
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button type="submit">SEARCH</button>
            </form>
        </div>
    )

}
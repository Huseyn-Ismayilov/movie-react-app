import { useState } from 'react';
import MoviesList from './components/MoviesList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState('');

  const handleSearch = (searchTerm) => {
      setSearchResults(searchTerm);
  };


  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <MoviesList searchResults={searchResults}/>
    </>
  )
}

export default App

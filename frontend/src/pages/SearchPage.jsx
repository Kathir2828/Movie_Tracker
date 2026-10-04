import "./SearchPage.css";
import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY_TMDB;


function SearchPage() {
  const [movieName, setMovieName] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsloading] = useState(false);


  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = async () => {
    try {
      setIsloading(true);

      fetch(`${BASE_URL}/search/movie?query=${movieName}`)
        .then((res) => res.json())
        .then((data) => setMovieList(data.results))
        .catch((err) => console.log(err, " error fetching movies in searchPage"));
    }
    catch (error) {
      console.log(error, " error fetching movies in searchPage");
    }
    finally {
      setIsloading(false);
    }

  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <div className="home-container">

          {/* SEARCH HEADER */}
          <header className="home-header">
            <div className="brand">
              <h2>Search Movies</h2>
            </div>

            <div className="search-container" style={{ margin: '0 auto' }}>
              <input
                className="search-input"
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Search for a movie..."
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </header>

          {/* SEARCH RESULTS GRID */}
          <div className="category-section">
            <div className="movies-grid">
              {!isLoading && movieList && movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {movieList.length === 0 && (<h2 style={{ color: 'red' }}>No Movie Found. Try searching for another movie!</h2>)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchPage;
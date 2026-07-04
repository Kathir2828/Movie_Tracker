import React from 'react';
import './movieCard.css'
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  
  return (
    <div className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={movie.title} />

      {/* This holds the title and the 3-line description */}
      <div className="movie-info">
        <h3>
          <span className="movie-rating" style={{ color: '#ffd700' }}>
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
          <span className="movie-title-text"> {movie.title}</span>
        </h3>
      </div>
    </div>
  );
}

export default MovieCard;
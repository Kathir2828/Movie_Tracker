import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './MovieDetailsPage.css';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY_TMDB;

function MovieDetailsPage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const Navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fun = async () => {
            try {
                // Fetch movie detailssss
                const res = await fetch(`${BASE_URL}/movie/${id}`);
                const data = await res.json();
                setMovieDetails(data);


                const user = auth.currentUser;
                if (!user) {
                    setIsInWatchlist(false);
                }
                else {
                    const movieRef = doc(db, "user", user.uid, "watchlist", data.id.toString());
                    const snap = await getDoc(movieRef)
                    if (snap.exists()) {
                        setIsInWatchlist(true);
                    }
                    else setIsInWatchlist(false);
                }
            }
            catch (err) {
                console.log("error fetching movie details ", err)
            }
        }
        fun();
    }, [id]);



    // user -> userId -> watchlist -> movieId -> movie detail like poster,title,rating,...
    //                ->  email

    const handleWatchlistToggle = () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                Navigate('/login');
                console.log("not logined");
                return;
            }
            if (!isInWatchlist) addCurrentMovie();
            else removeCurrentMovie();
        }
        catch (err) {
            console.log('error handleWathclistTOggle watchlist ', err);
        }
    };

    const addCurrentMovie = async () => {
        try {
            const user = auth.currentUser;
            const movieRef = doc(db, "user", user.uid, "watchlist", movieDetails.id.toString());
            await setDoc(movieRef, {
                poster_path: movieDetails.poster_path,
                backdrop_path: movieDetails.backdrop_path,
                title: movieDetails.title,
                vote_average: movieDetails.vote_average,
                overview: movieDetails.overview,
                release_date: movieDetails.release_date,
                runtime: movieDetails.runtime,
                genres: movieDetails.genres
            });
            setIsInWatchlist(true);
        }
        catch (e) {
            console.log("error in add/delete in addCurrentMovie watchlist ", e);
        }
    };

    const removeCurrentMovie = async () => {
        try {
            const user = auth.currentUser;
            const movieRef = doc(db, "user", user.uid, "watchlist", movieDetails.id.toString());
            await deleteDoc(movieRef);
            setIsInWatchlist(false);
        }
        catch (e) {
            console.log("error in add/delete removeCurrentMovie in watchlist ", e);
        }
    };

    if (!movieDetails) return <div className="loading-screen">Loading...</div>;

    const backdropUrl = movieDetails.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
        : `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`;

    const formatRuntime = (minutes) => {
        if (!minutes) return '';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    };

    const releaseYear = movieDetails.release_date ? movieDetails.release_date.split('-')[0] : '';
    const genres = movieDetails.genres ? movieDetails.genres.map(g => g.name).join(' • ') : '';

    return (
        <div className="movie-details-container">
            {/* Background Backdrop Image */}
            <div className="backdrop-container">
                <img className="backdrop-img" src={backdropUrl} alt={movieDetails.title} />
                <div className="backdrop-overlay"></div>
            </div>

            {/* Content Overlaid on Left */}
            <div className="details-content">
                <h1 className="movie-title">{movieDetails.title}</h1>

                <div className="meta-row">
                    <span className="rating-badge">⭐ {movieDetails.vote_average?.toFixed(1)}</span>
                    {releaseYear && <span className="meta-item">{releaseYear}</span>}
                    {movieDetails.runtime > 0 && <span className="meta-item">{formatRuntime(movieDetails.runtime)}</span>}
                </div>
                {genres && <div className="genres-row">{genres}</div>}

                <p className="movie-overview">{movieDetails.overview}</p>

                <div className="actions-row">
                    <button onClick={() => Navigate(-1)} className="btn btn-primary">
                        <div className="btn-icon icon-back"></div>
                        Back
                    </button>
                    <button className={`btn btn-secondary ${isInWatchlist ? 'in-watchlist' : ''}`} onClick={handleWatchlistToggle}>
                        {isInWatchlist ? (
                            <>
                                <div className="btn-icon icon-check"></div>
                                Saved to Watchlist
                            </>
                        ) : (
                            <>
                                <div className="btn-icon icon-plus"></div>
                                Save to Watchlist
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsPage;
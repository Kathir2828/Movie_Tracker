import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import './HomePage.css';
import { signOut } from 'firebase/auth';
import Sidebar from '../components/Sidebar.jsx';

import { auth } from '../config/firebase.js';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const TARGET_YEAR = 2026;
function HomePage() {

  console.log(auth.currentUser?.email)

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const Navigate = useNavigate();



  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/discover/movie?primary_release_year=${TARGET_YEAR}&sort_by=popularity.desc&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          if (page == 1) {
            setPopularMovies(data.results);
          }
          else {
            setPopularMovies((prev) => [...prev, ...data.results])
          }
        }
        setIsLoading(false);
      })
      .catch((err) => console.log)
      .finally(() => setIsLoading(false));
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [isLoading]);

  useEffect(() => {

    fetch(`${BASE_URL}/discover/movie?with_original_language=ta&certification_country=IN&certification.lte=U/A&sort_by=vote_average.desc&vote_count.gte=10&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovies(data.results);
        console.log(data.results);
      })
      .catch((err) => console.log("Error fetching Top Rated", err));



    fetch(`${BASE_URL}/discover/movie?with_original_language=ta&include_adult=false&primary_release_year=${TARGET_YEAR}&sort_by=popularity.desc&page=1`).then((res) => res.json())
      .then((data) => setUpcomingMovies(data.results))
      .catch((err) => console.log("Error fetching Upcoming", err));
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Navigate('/login');
    }
    catch (err) {
      console.log(err);
      console.log('error while loggin out');
    }
  };

  return (
    <div className='app-layout'>
      {/* <Sidebar /> */}
      <Sidebar />

      <div className='main-content'>
        <div className="home-container">
          {/* HEADER SECTION */}
          <header className="home-header">
            <div className="brand">
              <img className="brand-icon" src="/logo-icon.png" alt="MovieFlix logo" />
              <h2>MovieFlix</h2>
            </div>

            <div className="header-actions">
              <button className="icon-button" type="button" aria-label="Settings">
                <img className="action-icon" src="/settings-icon.png" alt="" />
              </button>
              <button className="header-button" onClick={handleSignOut}>
                Sign Out
              </button>
              <Link className="header-button" to="/login">Login</Link>
              <Link className="header-button header-button-primary" to="/Signup">Sign Up</Link>
            </div>
          </header>



          {/* ROW 1: TOP RATED */}
          <div className="category-section">
            <h1>Top Rated Movies</h1>
            <div className="movies-row">
              {topRatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {/* ROW 2: UPCOMING */}
          <div className="category-section">
            <h1>Upcoming Movies</h1>
            <div className="movies-row">
              {upcomingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {/* ROW 3: POPULAR (Using the 'movies-grid' class for vertical layout) */}
          <div className="category-section">
            <h1>Popular Movies</h1>
            <div className="movies-grid">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          <div
            ref={observerRef}
            className='category-section'
            style={{ height: '20px', width: '20px' }}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
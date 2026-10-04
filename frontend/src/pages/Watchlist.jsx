import "./Watchlist.css";
import { auth, db } from "../config/firebase.js";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import { doc, getDocs, collection } from 'firebase/firestore';
import MovieCard from '../components/MovieCard.jsx';
function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    const isLogined = () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("user have to be logged to see watchlist");
        Navigate('/login');
        return;
      }
    };
    isLogined();

    const fetchMovieFromFirebase = async () => {
      try {
        const user = auth.currentUser;
        const movieIds = collection(db, "user", user.uid.toString(), "watchlist");
        const snapShotData = await getDocs(movieIds);
        const userData = snapShotData.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setWatchlist(userData);
        console.log(userData);
      }
      catch (err) {
        console.log("error in fetchMovieFromFirebase", err);
      }
    };
    fetchMovieFromFirebase();
  }, []);


  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <div className="watchlist-header">

          <div className="sort-controls">
            <div className="sort-btn" onClick={() => {
              setWatchlist([...watchlist].reverse())
            }}>
              Reverse Order
            </div>
            <div className="sort-btn" onClick={() => {
              setWatchlist([...watchlist].sort((a, b) => { return a.title.localeCompare(b.title) }))
            }}>
              Alphabetical (A-Z)
            </div>
            <div className="sort-btn" onClick={() => {
              setWatchlist([...watchlist].sort((a, b) => { return b.vote_average - a.vote_average }))
            }}>
              Highest Rated
            </div>
          </div>
        </div>

        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>


      </div>
    </div>
  );
}

export default Watchlist;
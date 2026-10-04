# MovieFlix - Netflix Clone

A Netflix clone web application built using React, Vite, and Firebase. This app allows users to browse movies, search for specific titles, and maintain a personal watchlist. It integrates with the TMDB API to fetch movie data and uses Firebase for authentication and database management.

## 🚀 Features

- **User Authentication:** Secure signup and login using Firebase Authentication (Email/Password and Google Auth).
- **Movie Catalog:** Fetches and displays popular, top-rated, and upcoming movies using the TMDB API.
- **Infinite Scrolling:** Automatically loads more movies as you scroll down the popular movies section using `IntersectionObserver`.
- **Search Functionality:** Allows users to search for specific movies dynamically.
- **Personal Watchlist:** Users can add movies to their personal watchlist. Watchlist data is saved securely per-user in Firebase Firestore.
- **Sorting:** Sort watchlist movies alphabetically (A-Z), reverse order, or by highest rating.
- **Responsive UI:** A clean, Netflix-inspired dark-themed UI built with custom CSS.

## 🛠️ Technologies Used

- **Frontend:** React (with Hooks), Vite, React Router DOM
- **Backend/BaaS:** Firebase (Authentication, Firestore)
- **API:** TMDB (The Movie Database) API
- **Styling:** Vanilla CSS

## 📦 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- A Firebase project with Authentication and Firestore enabled
- A TMDB (The Movie Database) API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd netflix_clone_using_rct
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root of the project and add your TMDB API key:
   ```env
   VITE_REACT_APP_API_KEY_TMDB=your_tmdb_api_key_here
   ```
   *(Note: Ensure your Firebase configuration in `src/config/firebase.js` is correctly set up with your Firebase project credentials.)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port Vite provides) to view the app.

## 📂 Project Structure

- `src/components/`: Reusable React components (`MovieCard`, `Sidebar`, etc.)
- `src/pages/`: Main application pages (`HomePage`, `Login`, `Signup`, `SearchPage`, `Watchlist`, `MovieDetailsPage`)
- `src/config/`: Firebase initialization and configuration
- `src/App.jsx`: Main routing file

## 📝 License

This project is open-source and available under the MIT License.

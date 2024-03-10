import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import CollectionPage from "./pages/CollectionPage";
import CollectionDetailPage from "./pages/CollectionDetailPage"; 
import Signup from "./components/Signup";
//import Login from "./components/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      {/* <h1><WachWhitUs></WachWhitUs></h1> */}

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/collections/:collectionId" element={<CollectionDetailPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

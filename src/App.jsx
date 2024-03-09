import { useState } from "react";
import "./App.css";
import "./pages/MoviePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";
import CollectionDetailPage from "./pages/CollectionDetailPage";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage"
import { AuthProviderWrapper } from "./Context/auth.context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProviderWrapper>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/collections/:collectionId" element={<CollectionDetailPage />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProviderWrapper>
  );
}
//
export default App;

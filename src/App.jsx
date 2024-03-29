import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import CollectionPage from "./pages/CollectionPage";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";
import CollectionListPage from "./pages/CollectionListPage";
import UpdateCollectionPage from "./pages/UpdateCollectionPage"; 
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movieForm" element={<IsPrivate><MoviePage /></IsPrivate>} />
        <Route path="/collectionForm" element={<IsPrivate><CollectionPage /></IsPrivate>} />
        <Route path="/collectionList" element={<IsPrivate><CollectionListPage /></IsPrivate>} />
        <Route path="/collections/:id/update" element={ <IsPrivate> <UpdateCollectionPage /> </IsPrivate>} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
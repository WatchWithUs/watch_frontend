import { useState } from 'react'
import './App.css'
import './pages/MoviePage'
import Navbar from './components/Navbar'
import {  Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import { BrowserRouter as Router } from 'react-router-dom';
import CollectionPage from './pages/CollectionPage'; // Importe a página de coleções
import CollectionDetailPage from './pages/CollectionDetailPage'; // Importe a página de detalhes da coleção
function App() {
  const [count, setCount] = useState(0)
 
  return (
    <Router>
    
      
      {/* <h1><WachWhitUs></WachWhitUs></h1> */}

       <Navbar /> 
      
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/collections/:collectionId" element={<CollectionDetailPage />} />
  
      </Routes>
    </Router>
    
  )
}

export default App

import { useState } from 'react'
import './App.css'
import './pages/MoviePage'
import Navbar from './components/Navbar'
import {  Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <Router>
    
      
      {/* <h1><WachWhitUs></WachWhitUs></h1> */}

       <Navbar /> 
      
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/movies" element={<MoviePage />} />
  
      </Routes>
    </Router>
    
  )
}

export default App

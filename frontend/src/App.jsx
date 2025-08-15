import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import About from './Pages/About';
import PageNotFound from './Pages/PageNotFound';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
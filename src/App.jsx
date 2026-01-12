import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeholder from './pages/Placeholder/Placeholder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopup/LoginPopUp'

import MyOrder from './pages/MyOrder/MyOrder'
import Verify from './pages/verify/Verify'



function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeholder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrder />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App
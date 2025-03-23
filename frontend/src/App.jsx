import Home from "./pages/Home.jsx";
import Splash from "./Components/core/SplashScreen.jsx";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About.jsx";
import Coat from "./pages/Coat.jsx";
import Shervani from "./pages/Shervani.jsx";
import Frok from "./pages/Frok.jsx";
import NavBar from "./Components/common/NavBar.jsx";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BeARenter from './pages/BeARenter';
import "./App.css";
function App() {
  return <AppWithSplash />;
}

const AppWithSplash = () => {
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/'){
      setShowSplash(true);
      const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Show Splash Screen First */}
      {showSplash ? (
        <Splash />
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/coat" element={<Coat />} />
            <Route path="/shervani" element={<Shervani />} />
            <Route path="/frok" element={<Frok />} />
            <Route path="/my-account" element={<Profile/>}/>
            <Route path="/Be-A-Renter" element={<BeARenter/>}/>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;

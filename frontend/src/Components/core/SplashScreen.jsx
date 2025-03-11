import { useEffect, useState } from "react";
import "./SplashScreen.css";

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <h1 className="text-9xl">
        Welcome to <span>Kloset</span>
      </h1>
      <div className="loader"></div>
    </div>
  );
};

export default SplashScreen;

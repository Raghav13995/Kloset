import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/common/NavBar';
import ImageSlider from '../Components/core/Home/ImageSlider';

// Importing images
import coat from "../utility/images/coat.jpg";
import frock from "../utility/images/frock.jpg";
import lehenga from "../utility/images/lehenga.jpg";
import shervaniImg from "../utility/images/shervani.jpg";
import shervani2 from "../utility/images/shervani2.jpg";
import lehenga2 from "../utility/images/Ai-bg.webp";
import Footer from '../Components/common/Footer';
import Testimonial from '../Components/core/Home/Testimonial';

// Tailwind styles for image cards
const itemStyle =
  "w-44 h-44 md:w-52 md:h-52 shadow-lg rounded-full overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-110 border-4 border-gray-200 hover:border-gray-400 bg-white";

const Home = () => {
  return (
    <>
      {/* Full Screen Hero Section */}
      <div className="w-screen min-h-screen flex flex-col items-center bg-gray-100 " style={{ backgroundImage: `url(${lehenga2})` }}>
        {/* Hero Section */}
        <div className="w-11/12 max-w-[1400px] flex flex-col justify-center h-screen text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">KLOSET</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Rent your perfect outfit for every occasion
          </p>
          <Link to="/shop">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all">
              Explore Collection
            </button>
          </Link>
        </div>
      </div>

      {/* Clothing Categories */}
      <div className="py-12 w-full bg-white">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
          Browse by Category
        </h2>

        <div className="flex flex-wrap justify-center gap-6 px-4">
          <Link to="/coat">
            <div className={itemStyle}>
              <img src={coat} alt="Coat" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
          <Link to="/shervani">
            <div className={itemStyle}>
              <img src={frock} alt="Frock" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
          <Link to="/frock">
            <div className={itemStyle}>
              <img src={shervaniImg} alt="Shervani" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
          <Link to="/shervani">
            <div className={itemStyle}>
              <img src={shervani2} alt="Shervani 2" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
          <Link to="/lehenga">
            <div className={itemStyle}>
              <img src={lehenga} alt="Lehenga" className="w-full h-full object-cover rounded-full" />
            </div>
          </Link>
        </div>
      </div>

      {/* Image Slider Section */}
      <div className="py-12 bg-gray-100">
        <ImageSlider />
      </div>

      {/* Testimonial Section */}
      <Testimonial />
      <Footer />
    </>
  );
};

export default Home;

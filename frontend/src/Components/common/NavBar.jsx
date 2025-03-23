import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbarLinks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../slices/authslice';
import { setUser } from '../../slices/profileslice';
const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    useEffect(() => {
        // Check if user is logged in by looking for token in localStorage
        console.log("token from Navar",token);
        console.log("User from Navar",user);

        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setToken(null));
        dispatch(setUser(null));
        setIsLoggedIn(false);
        console.log("Token Cleared");
        navigate('/');
    };

    return (  
    <div className={`fixed flex h-16 items-center justify-center z-99 w-screen  ${scrolled ? "bg-gradient-to-r from-[#8b8e8c] via-[#eeede8] to-[#8b8e8c] transition-colors duration-500 z-100" : ""}`}>
        <div className={`w-11/12 max-w-[1400px] flex justify-between items-center`}>
            <Link to="/">
                <div className='text-5xl flex m-auto pl-2.5 font-bold'>Kloset</div>
            </Link>

            
            <nav>
                    <ul className=" md:flex pt-5 pb-5 gap-x-10 text-xl text-pretty font-bold items-center">
                        
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>
                                        <p className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105">
                                            {link.title}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    
                </nav>
                <div>
                {!isLoggedIn ? (
                            <div className='flex gap-x-4'>
                                
                                    <Link to="/login">
                                        <button className="bg-white text-black px-6 py-2 rounded-md border border-black hover:bg-black hover:text-white transition-colors duration-300">
                                            Login
                                        </button>
                                    </Link>
                                
                                 
                                    <Link to="/register" className='ml-4'>
                                        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-white hover:text-black border border-black transition-colors duration-300">
                                            Register
                                        </button>
                                    </Link>
                                
                            </div>
                        ) : (
                                
                                <div className='md:flex gap-x-4 items-center'>
                                    <div className='text-xl font-bold'>
                                        <Link to="/my-account">
                                            My Account
                                        </Link>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 ml-4"
                                        
                                    >
                                        Logout
                                    </button>
                                </div>
                            
                        )}
                </div>
            </div>
        </div>
    )
};

export default NavBar;
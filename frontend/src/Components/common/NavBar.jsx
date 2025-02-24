import React from 'react'
import { Link } from 'react-router-dom';
import logoo from './KlosetLogo.png';
import LoginModal from '../core/LoginModal';
import { NavbarLinks } from '../../data/navbarLinks';
import { useState, useEffect } from 'react';
const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
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

    return (
        
        <div  className={`w-full fixed flex justify-between align-middle ${scrolled ? "bg-[#dac8ba] transition-colors duration-500 z-100" : ""}`}>
            <Link to="/">
                <img className="h-[7rem] ml-9 mt-0 mix-blend-dark" src={logoo} />
            </Link>

            
            <nav className="mr-10">
                <ul className=" flex pt-11 text-xl text-pretty font- font-bold ">
                    <li className="cursor-pointer px-10 transition-transform duration-200 ease-in-out hover:scale-105">
                        
                    </li>
                    {
                        
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} >
                                    <p className="cursor-pointer px-10 transition-transform duration-200 ease-in-out hover:scale-105" >
                                        {link.title}
                                    </p>
                                    
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav> 
        </div>
    )
};

export default NavBar;
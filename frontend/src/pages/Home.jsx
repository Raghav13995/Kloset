import React from 'react';
import stone from './item.png';
import NavBar from '../Components/common/NavBar';
import image from './bg.jpg'
import { Link } from 'react-router-dom';
import coat from "../utility/images/coat.jpg"
import froak from "../utility/images/frock.jpg"
import lehenga from "../utility/images/lehenga.jpg"
import shervaniImg from "../utility/images/shervani.jpg"
import shervani2 from "../utility/images/shervani2.jpg"
import { Collage } from '../Components/core/Collage';
import ImageSlider from '../Components/core/ImageSlider';
const Home = () => {
    const StyleTailW = "w-52 h-52 shadow-[10px_0_10px_rgba(0,0,0,0.3)] rounded-full  transition-all duration-500 ease-in-out  hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] hover:scale-[1.03]"
    return (
        <div>
            
            <div className="bg-cover flex flex-col justify-end h-screen" style={{backgroundImage:`url(${image})`}}>
                <div></div>
                <div className=" flex  justify-end" >
                    <div className=" w-full pt-12 pb-12">
                            <div className="flex w-full justify-evenly ">
                            <Link to="/coat">
                                <div className= {StyleTailW} style={{ backgroundImage: `url(${stone})`}} >
                                    <div className='w-full h-full bg-cover mix-blend-multiply rounded-full' style={{backgroundImage:`url(${coat})`}}></div> 
                                </div>
                            </Link>
                            <Link to="/shervani">
                                <div className= {StyleTailW} style={{ backgroundImage: `url(${stone})`}}>  
                                    <div className='w-full h-full bg-cover mix-blend-multiply rounded-full' style={{backgroundImage:`url(${froak})`}}></div>
                                </div>
                            </Link>
                            <Link to="/frok">
                                <div className= {StyleTailW} style={{ backgroundImage: `url(${stone})`}}>  
                                    <div className='w-full h-full bg-cover mix-blend-multiply rounded-full' style={{backgroundImage:`url(${shervaniImg})`}}></div>
                                </div>
                            </Link>
                            <Link to="/coat">
                                <div className= {StyleTailW} style={{ backgroundImage: `url(${stone})`}}>  
                                    <div className='w-full h-full bg-cover mix-blend-multiply rounded-full' style={{backgroundImage:`url(${shervani2})`}}></div>
                                </div>
                            </Link>
                            <Link to="/coat">
                                <div className= {StyleTailW} style={{ backgroundImage: `url(${stone})`}}>  
                                    <div className='w-full h-full bg-cover mix-blend-multiply rounded-full' style={{backgroundImage:`url(${lehenga})`}}></div>
                                </div>
                            </Link>
                                
                            </div>
                    </div>
                </div>
            </div>
            <ImageSlider/>
            {/* <Collage/> */}
        </div>
    )
}

export default Home;
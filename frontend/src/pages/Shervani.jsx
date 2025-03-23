import React from 'react'
// import NavBar from '../Components/common/NavBar'
import  Clothcomponent from '../Components/core/clothcomponent';
import {allUsers} from "../data/databasetype"
import { useState } from "react";
import { Heart } from "lucide-react";
const users2 = allUsers.filter((user) => user.tag === "Sherwani"); 
console.log(users2);

const Shervani = () => {

  return (
    <div className='flex w-screen justify-center items-center'>
      <div className="flex flex-wrap justify-evenly pt-40 mr-12 ml-12 pl-16 pr-16 max-w-[1400px]">
        { users2.map((Data) => {
            return <RentalCard item = {Data} />
          })
        }
      </div>
    </div>
  )
}

export default Shervani;



const RentalCard = (props) =>  {

  const {item} = props;
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-[300px] overflow-hidden transition-transform duration-300 hover:scale-105 m-10 shadow-lg relative">

      <div className="relative">
        <img
          src={item.img} 
          alt="Blue Suit"
          className="w-full h-96 object-cover"
        />
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
        >
          <Heart size={20} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold">THE  {item.description}LUXE</h3>
        <p className="text-gray-600 text-sm">BLUE SUIT</p>
        <p className="text-red-500 font-semibold text-lg">
          ₹2,499 <span className="text-gray-500 text-sm">rent</span>
        </p>
        <p className="text-gray-400 text-xs">(18.0K MRP)</p>
      </div>
    </div>
  );
}
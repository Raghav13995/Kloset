import React from 'react'
import NavBar from '../Components/common/NavBar'
import "./Coat.css"
import {allUsers} from "../data/databasetype"
import Clothcomponent from '../Components/core/clothcomponent';
// const users = allUsers.filter((user) => user.tag === "Lehenga");   
const users3 = allUsers.filter((user) => user.tag === "Coat");
// const users4 = allUsers.filter((user) => user.tag === "Gown");
console.log(allUsers);
const Coat = () => {
 

  return (
    <>
    
      <div className="flex flex-col justify-center items-center">
        <div className='w-11/12 max-w-[1400px]'>
          <Clothcomponent users={users3}/>
        </div>
      
      </div>
      
    </>
  );
};
export default Coat
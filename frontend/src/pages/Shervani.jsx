import React from 'react'
// import NavBar from '../Components/common/NavBar'
import  Clothcomponent from '../Components/core/clothcomponent';
import {allUsers} from "../data/databasetype"
const users2 = allUsers.filter((user) => user.tag === "Sherwani"); 
console.log(users2);
const Shervani = () => {
  return (
    <div>
        {/* <NavBar/> */}
        <Clothcomponent users={users2}/>
    </div>
  )
}

export default Shervani
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddItemForm from "../Components/core/AddItemForm";
 const Profile = () => {
    const [activeTab, setActiveTab] = useState("MyDetails");
    const {user} = useSelector(state => state.profile);
    console.log("From Profile Page : --- ",user);
    console.log("From Profile Page : --- ",user.firstName);
    // console.log(profile);
    return (
      <div className="flex pt-40">
   
        <nav className="w-1/4 p-4 border-r">
          <ul className="space-y-2">
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "MyDetails" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("MyDetails")}>My Details</button></li>
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "MyItems" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("MyItems")}>My Items </button></li>
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "AddItem" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("AddItem")}>Add Item</button></li>
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "MyBookings" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("MyBookings")}>My Bookings</button></li>
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "MyEarnings" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("MyEarnings")}>My Earnings</button></li>
            <li><button className={`w-2xs h-14 shadow-lg mb-4 ${activeTab === "Setting" ? "bg-[#002147] text-amber-50" : "bg-white text-[#002147]" }`} onClick={() => setActiveTab("Setting")}>Setting</button></li>
         
          </ul>
        </nav>
  
        
   
        <div className="w-3/4 px-10">
            <div className= "bg-[#f5f5f5] p-4  ">
            <div className="px-10 bg-white shadow-2xl text-2xl  h-96">
               {activeTab === "MyDetails" && <MyDetails  user={user}/>}
               {activeTab === "MyItems" && <MyItems/>}
               {activeTab === "AddItem" && <AddItems />}
               {activeTab === "MyBookings" && <MyBookings  />}
               {activeTab === "MyEarnings" && <MyEarnings />}
            </div>
             </div>
            </div>
        </div>
          
       
    
    );
  };
  const MyDetails = ({user}) => {
    return  <div className="text-left p-6">
    <h1>Name :{user?.firstName} </h1>
    <h1>Email : {user?.email}</h1>
    <h1>Contact : {user?.contact}</h1>
    <h1>Address : {user?.additionalDetails?.address ?? "No address available"}</h1>
    <h1>BirthDate : {user?.additionalDetails?.dob ?? "No birth date available"}</h1>
    </div>
  };
  const MyItems = () => {
    return <div className="flex flex-col">
            <div className="p-4 block ">
              <div className="bg-white shadow-lg p-4 flex">
                <h1>Item Name,  </h1>
                <p>Price: $100,  </p>
                <p>Category: Category.</p>
              </div>
            </div>
            <div className="p-4 ">
              <div className="bg-white shadow-lg p-4 flex">
                <h1>Item Name,  </h1>
                <p>Price: $100,  </p>
                <p>Category: Category.</p>
              </div>
            </div>
        </div>
  };
  const AddItems = () => {
    return <>
    <h1 className="pt-3">
      Adding An Item 
    </h1>
    <AddItemForm/>
    </>
    
  };
  const MyBookings = () => <h2>MyBookings</h2>;
  const MyEarnings = () => <h2>MyEarnings</h2>;

export default Profile;
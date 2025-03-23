import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BeARenter = () => {
    const[isLoading, setIsLoading] = useState(false);
    return (
        <>
          <div className="pt-40 pr-60 pb-40 pl-60">
              <div className="bg-[#002147] p-4  ">
              <div className="px-10 bg-white shadow-2xl text-2xl shadow-indigo-950 text-indigo-950">
              <h1 className="font-sans text-3xl pt-2  ">Becomming a Renter</h1>
              <Form setIsLoading={setIsLoading}/>
              </div>
              </div>
          </div>
        </>
      );
    };
const Form = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors , isSubmitting },
    } = useForm({ shouldUnregister: true });
    const [userType, setUserType] = useState("individual"); // Track selected role
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const onSubmit = async(data) => {
      // e.preventDefault();
      console.log("Token from Be A renter",token);
      if(token){
        console.log("Already Logged In");
        navigate("/");
        return;
      }
      console.log(data);
      // 
      //  Do Validation Here: -
      // 

      // setIsLoading(true);
      try{
        const response = await fetch('http://localhost:8000/api/v1/renterAuth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const data2 = await response.json();
        console.log("Data from Be a Renter - ",data2);
        if (data2.success) {
          console.log("Renter Registered Successfully");
          navigate('/login');
        } else {
          console.log("Registration Failed")
        }
      }
      catch(error){
        console.log(error);
      }

    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-2">
         
          <div className="flex flex-col items-center">
            <label className="block my-2 text-lg">Register As</label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="individual"
                  defaultChecked
                  {...register("userType", { 
                    required: "Please select a role", 
                    pattern: { 
                      value: /^[A-Za-z\s]+$/, 
                      message: "Only letters and spaces are allowed" 
                    }
                  })}
                  
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Individual</span>
              </label>
  
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="shop"
                  {...register("userType", { required: "Please select a role" })}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Rental Shop</span>
              </label>
            </div>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType.message}</p>}
          </div>
  
     
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block my-2">First Name</label>
              <input {...register("firstName", { required: "Required" })} className="w-full border p-2 rounded" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
  
            <div>
              <label className="block my-2">Last Name</label>
              <input {...register("lastName", { required: "Required" })} className="w-full border p-2 rounded" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
  
          <div>
            <label className="block my-2">Email Id</label>
            <input {...register("email", { required: "Required" })} className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block my-2">Mobile Number</label>
              <input {...register("contact")} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block my-2">PassWord</label>
              <input type="password"{...register("password")} className="w-full border p-2 rounded" />
            </div>
          </div>
          {
            userType === "individual" && (
                <>
                <div>
                <label className="block my-2">Aadhar Number</label>
                <input {...register("aadharNumber", { required: "Required for Individual" })} className="w-full border p-2 rounded" />
                {errors.AadharNumber && <p className="text-red-500 text-sm">{errors.AadharNumber.message}</p>}
              </div>
                </>
            )
          }
  
      
          {userType === "shop" && (
            <>
              <div>
                <label className="block my-2">Shop Name</label>
                <input {...register("shopName", { required: "Required for shops" })} className="w-full border p-2 rounded" />
                {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName.message}</p>}
              </div>
  
              <div>
                <label className="block my-2">Business Registration Number</label>
                <input {...register("businessReg")} className="w-full border p-2 rounded" />
              </div>
  
              <div>
                <label className="block my-2">Shop Address</label>
                <input {...register("shopAddress")} className="w-full border p-2 rounded" />
              </div>
            </>
          )}
  
         
          <div className="flex justify-center">
            <button type="submit" disabled={isSubmitting} value={(isSubmitting) ? "submittng" : "submit"} className="my-4 bg-[#002147] text-amber-50 px-6 py-2 rounded hover:bg-white hover:text-[#002147]">
              SAVE
            </button>
          </div>
        </form>
 
    );
  };
  


export default BeARenter;
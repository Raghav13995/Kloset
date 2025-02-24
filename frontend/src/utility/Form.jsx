import { useForm } from "react-hook-form";

export const Form = () => {
    const [log , setLog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6">
        <div className="flex justify-center space-x-2">

      <h2 className="text-2xl font-bold text-stone-500 text-center mb-4" onClick={()=>{setLog(true)}}> {log ? "LOGIN /" : "Login /"}</h2> 

       <h2 className="text-2xl font-bold text-stone-500 text-center mb-4" onClick={()=>{setLog(false)}}>{log ? "Register": "REGISTER"}</h2>
       </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         {/* Username */} 
       { !log && <div>
          <label className="block font-medium text-stone-500">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
}
      
        <div>
          <label className="block font-medium text-stone-500">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-stone-500">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-stone-500 text-white p-2 rounded-lg hover:bg-[#faf7f2] hover:text-stone-500 hover:border hover:border-stone hover:transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
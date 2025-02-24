import React from 'react'
import { useForm } from "react-hook-form";

const Form = () => {
    const { 
        register,
        handleSubmit, 
        watch, 
        formState: { errors,isSubmitting } 
    } = useForm();
    const onSubmit = async (data) => {
        await new Promise((resolve)=>setTimeout(resolve,5000));
        console.log("Submitting the data : -",data);
    };
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>First Name:</label>  
                <input className={errors.firstName ? 'input_error' : ''} {...register('firstName',
                    {
                        required: true,
                        minLength: {Value:3 , message:"minimum length should be 3"},
                        maxLength: {value:20,message:"MaxLength should be 20"},
                    }
                )  
                }/>
                {errors.firstName && <div className='err-msg'>{errors.firstName.message}</div>}
            </div>
            <div>
                <label>Last Name:</label>  
                <input {...register('lastName')} placeholder="Enter text here" style={{ border: "2px solid black", }} />
            </div>
            <div>
                <label> Email:</label>  
                <input {...register('email',{
                    required: true,
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                    }
                })} />
                {errors.email && <p>{errors.email.message}</p>}
                <br />
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
            </div>
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? "submitting" : "submit"} />
        </form>
    </div>
  )
}

export default Form;
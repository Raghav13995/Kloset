import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
const AddItemForm = () => {
  const [imageURL, setImageURL] = useState(""); // Store uploaded image URL
  const [uploading, setUploading] = useState(false);
  const {user} = useSelector((state)=>state.profile);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function to handle image upload
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rtg_preset"); // Replace with your actual upload preset

    try {   
      const response = await fetch("https://api.cloudinary.com/v1_1/dgkvkldxn/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary Response:", data);
      if (data.secure_url) {
        setImageURL(data.secure_url); // ✅ Correctly set image URL
      } else {
        console.error("Image upload failed:", data);
      }
      
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async(data) => {
    if (!imageURL) {
      alert("Please upload an image first.");
      return;
    }
    const finalData = { ...data, image: imageURL, renter_Id: user._id};
    console.log("Final Form Data:", finalData);
    

    const response = await fetch('http://localhost:8000/api/v1/renter/Add_Item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData)
    });
    console.log("From Add Item");
    const data2 = await response.json();
    console.log("From Add Item Form --- ",data2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        
        <div>
          <label className="block font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            {...register("itemName", { required: "Item Name is required" })}
            className="w-full p-2 border rounded"
            placeholder="e.g. Leather Jacket"
          />
          {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName.message}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            {...register("price", { required: "Price is required", min: 1 })}
            className="w-full p-2 border rounded"
            placeholder="e.g. 100"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <select {...register("category")} className="w-full p-2 border rounded">
            <option value="Lehenga">Lehenga</option>
            <option value="Frock">Frock</option>
            <option value="Gown">Gown</option>
            <option value="Coat">Coat</option>
            <option value="Shervani">Shervani</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">General Size</label>
          <select {...register("size")} className="w-full p-2 border rounded">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full p-2 border rounded"
            placeholder="e.g. New York, NY"
          />
        </div>

        <div className="col-span-2">
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(e) => uploadImage(e.target.files[0])}
          />
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {imageURL && <img src={imageURL} alt="Preview" className="mt-2 h-24 rounded" />}
        </div>

        <div className="col-span-2">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border rounded"
            placeholder="Describe the item..."
            rows="3"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;

const Product = require('../models/Product');
const Renter = require('../models/Renter')

exports.Add_Item = async (req,res)=>{
    try{
        console.log("Entering Add_Item Controller : ");
        const{itemName,price,category,size,image,description,renter_Id}=req.body;
        const renter = await Renter.findById(renter_Id);
        if (!renter) {
            return res.status(404).json({ message: "Renter not found" });
        }
        const newProduct =  new Product({
            name:itemName,
            description:description,
            price:price,
            imageUrl:image,
            category:category,
            renter:renter_Id,
            size:size
        })
        const savedProduct=await newProduct.save();
        const updatedRenter = await Renter.findByIdAndUpdate(
            renter_Id,  
            { $push: { Products: savedProduct._id } }, // Add the product ID to Renter's Products array
            { new: true } // Return updated document
        );

        res.status(201).json({ success: true, message: "Item added successfully", item: newProduct });

        
    }
    catch(error){
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
    
}
import React from 'react'

const ProductPage = () => {
  return (
    <div>
        <div className="max-w-md mx-auto p-4 bg-white text-left">
        <h2 className="text-4xl font-bold md-4">LakshmiPati</h2>
        <p className="text-gray-600 text-2xl md-8">Stylish Royal Lehenga</p>
        <div className="flex items-center space-x-2 mt-2">
            <span className="text-2xl font-bold">₹1449</span>
            <span className="text-gray-400 line-through">₹28999</span>
            <span className="text-orange-500 font-semibold">Saving </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">For four Days </p>
        <p className="text-green-600 text-sm mt-1">inclusive of all taxes</p>
        
        <h3 className="text-sm font-semibold mt-4">SELECT DATE</h3>
        <div className="flex space-x-2 mt-2">
            {["20", "21", "22", "23", "24", "25", "26"].map(size => (
            <button
                key={size}
                className={`px-4 py-2 border rounded-full ${selectedSize === size ? "border-red-500" : "border-gray-300"}`}
                onClick={() => setSelectedSize(size)}
            >
                {size}
            </button>
            ))}
        </div>
        <p className="mt-2 text-sm text-center bg-red-100 p-2 rounded-lg">Security Deposit <strong>2000</strong>.</p>
        
        <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-red-500 text-white flex items-center justify-center space-x-2 px-4 py-2 rounded-lg">
            <ShoppingBag className="w-5 h-5" />
            <span>Rent Now</span>
            </button>
            <button className="border border-gray-400 flex items-center justify-center px-4 py-2 rounded-lg">
            <Heart className="w-5 h-5 text-gray-500" />
            </button>
        </div>
       </div>
    </div>
  )
}

export default ProductPage

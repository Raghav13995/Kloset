import React from 'react'

const Testimonial = () => {
  return (
    // Testimonial Section
    <div className="py-12 bg-gray-100">
    <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
        What Our Customers Say
    </h2>
    <div className="flex flex-wrap justify-center gap-6 px-4">
        {/* Testimonial 1 */}
        <div className="w-72 bg-white p-4 rounded-lg shadow-lg text-center">
        <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Customer 1" className="w-16 h-16 rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">"The collection is amazing! I rented a lehenga for my cousin's wedding, and it was stunning."</p>
        <h3 className="mt-2 font-semibold">- Priya Sharma</h3>
        </div>

        {/* Testimonial 2 */}
        <div className="w-72 bg-white p-4 rounded-lg shadow-lg text-center">
        <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="Customer 2" className="w-16 h-16 rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">"KLOSET saved me for my friend's reception! Great service and quick delivery."</p>
        <h3 className="mt-2 font-semibold">- Rahul Mehta</h3>
        </div>
    </div>
    </div>
  )
}

export default Testimonial


import React from "react";
import Link from "next/link";

const success = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                 <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Your order has been processed successfully.</p>
                <div className=" flex space-x-4">
                    <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                    Go to Home
                </Link>
                <Link href ="/order" className=" px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                   view order details
                </Link>
                </div>
            </div>
            
        </div>
    );
};

export default success;
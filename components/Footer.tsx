'use client';
import React from "react";
import Link from "next/link";




function Footer() {
 const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-lg font-bold">E-mart</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 md:mt-0 text-sm">
           <p>&copy;{year}  E-mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

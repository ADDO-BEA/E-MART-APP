
"use client";
import React from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo4.png";
import Cart from "./Cart";
import { FaClipboardList } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";


function Header() {
  const { user } = useUser();


  return (
    <header className="w-full bg-white-100 text-black py-2 border-b border-black-200 shadow-md hover:shadow-none">

      <Container className="flex items-center justify-between h-15 gap-5">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={80} height={20} priority />
        </Link>

        {/* Search Form */}
        <form action="/search" className="flex-1">
          <input
            type="text"
            name="query"
            placeholder="Search for items..."
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[900px] w-full"
          />
        </form>

        {/* Cart and Additional Options */}
        <div className="flex items-center gap-5">
          <Cart />

          {/* Conditionally Render Orders Link */}
          {user && (
            <Link
              href="/order"
              className="flex items-center justify-center relative w-10 h-10 border border-gray-300 rounded-lg shadow-md hover:shadow-none cursor-pointer transition-all duration-200"
            >
              <FaClipboardList size={25} className="text-gray-600" />
            </Link>
          )}

          {/* Account Section */}
          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton afterSignOutUrl="/" />
              <div>
                <p className="text-sm font-medium">Welcome, {user.firstName}</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center space-x-2 text-sm font-medium border border-gray-300 p-2 rounded-lg shadow-md hover:shadow-none bg-white-100 hoverEffect">
                <RiAccountCircleFill size={25} className="text-gray-600" />
                <span>Login</span>
              </button>
            </SignInButton>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;

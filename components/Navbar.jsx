"use client";

import React, { useState } from "react";
import { assets, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAccountClick = () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      router.push("/account"); // Or wherever user dashboard is
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Links */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition flex items-center gap-1">
          Shop <span className="bg-orange-600 text-[10px] text-white px-1.5 py-0.5 rounded-full">New</span>
        </Link>
        <Link href="/about-us" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/contact-us" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right icons */}
      <ul className="hidden md:flex items-center gap-4">
        <div className="relative">
          <Image
            className="w-4 h-4 cursor-pointer"
            src={assets.search_icon}
            alt="search icon"
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <form 
              className="absolute top-full right-0 mt-2 p-2 bg-white shadow-lg rounded z-50 min-w-[300px]"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                setSearchQuery("");
              }}
            >
<input
  type="text"
  name="search"
  placeholder="Search products..."
  className="w-full bg-transparent outline-none px-4 py-2"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
            </form>
          )}
        </div>

        {/* Cart Icon */}
        {isSignedIn && (
          <CartIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        )}

        {/* User / Account */}
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={handleAccountClick}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      {/* Mobile menu */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        <button
          onClick={handleAccountClick}
          className="flex items-center gap-2 hover:text-gray-900 transition"
        >
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

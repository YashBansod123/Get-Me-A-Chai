"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import React from "react"
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  //  if(session) {
  // return <>
  //   Signed in as {session.user.email} <br/>
  //   <button onClick={() => signOut()}>Sign out</button>
  // </>
  //   }
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    } 

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (!session?.user?.name) return;

      try {
        const res = await fetch(`/api/userdata?username=${session.user.name}`);
        const data = await res.json();
        setCurrentUser(data.user);
      } catch (err) {
        console.error("Navbar user fetch failed:", err);
      }
    };

    getUser();
  }, [session]);
  return (
    <nav className="bg-gray-900 text-white p-2 flex justify-between items-center shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold flex items-center justify-center  bg-gradient-to-r from-gray-400 to-pink-500 bg-clip-text text-transparent"
      >
        <Image className="InvertImg" src="/tea.gif" width={48} height={48} alt="Chai" />
        <Link className="hidden md:block" href="/">GetMeAChai</Link>
     </Link>
      {/* <divclassNameName="space-x-6 text-sm">
        <Link href="/"classNameName="hover:text-green-400 transition">
          Home
       </Link>
        <Link href="/about"classNameName="hover:text-green-400 transition">
          about
       </Link>
        <Link href="/contact"classNameName="hover:text-green-400 transition">
          Contact
       </Link>
      </div> */}
      <div className="relative gap-14" ref={dropdownRef}>
        {session && (
          <>
            <button
              
              onClick={() => setShowDropdown(!showDropdown)}
                //  onBlur={()=>setTimeout(() => setShowDropdown(false), 100)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-[-15px] md:mx-4 cursor-pointer relative  md:bg-gray-700 md:hover:bg-gray-800 md:focus:ring-4 md:focus:outline-none md:focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center md:dark:bg-gray-600 md:dark:hover:bg-gray-700 md:dark:focus:ring-blue-800"
              type="button"
            >
              {currentUser?.profilepic ? (
    <Image
      src={currentUser.profilepic}
      alt="Profile"
      className="w-8 h-8 rounded-full object-cover border-2 mx-2 border-white"
    />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-600" />
  )}{session.user.name}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                showDropdown ? "" : "hidden"
              } absolute  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                 </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`} 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                 </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                 </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* {session && ( 
          <Link href={"/dashboard"}>
            <button
              onClick={() => signOut()}
              type="button"
             className="text-white cursor-pointer mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Logout
            </button>
         </Link>
        )} */}

        {!session && (
          <Link href="/login">
            <button
              type="button"
              className="text-white cursor-pointer mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
         </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { MdMenu } from "react-icons/md";


export default function Navbar({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();
  const sidebarRef = useRef();
  const route = useRouter();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest("#sidebar-btn")) {
        if (window.innerWidth < 1024) setSidebarOpen(false); // only close on small screens
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Always open sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoutHandler = () => {
        localStorage.clear();

        route.push("/");
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:static top-0 left-0 h-lvh bg-gray-800 text-white max-w-100 p-10 transition-transform duration-300 z-40 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4">Customer Management App</h2>
        <ul>
          <li className="mb-2"><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li className="mb-2"><a href="/customers" className="hover:underline">Customers</a></li>
          <li className="mb-2"><a href="/enquiry" className="hover:underline">Enquiry</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-gray-900 text-white px-4 py-5 shadow-md">
          {/* Hamburger Menu for small screens */}
          <button
            id="sidebar-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl lg:hidden"
          >
            {/* ☰ */}
            <MdMenu />
          </button>

          {/* App Name */}
          <h1 className="text-lg font-bold"></h1>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <CgProfile
              className="text-3xl cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Profile</button>
                <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          {/* <h2 className="text-2xl">Welcome to My App</h2>
          <p>This is your main content area.</p> */}

          {children}
        </div>
      </div>
    </div>
  );
}

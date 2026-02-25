import { useState, useRef, useEffect } from "react";
import { FaBorderAll } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // ✅ useLocation import kiya

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const location = useLocation(); // ✅ Current path lene ke liye hook

  // ✅ Helper function to check active state
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-brand-green font-semibold" // Agar active hai to Brand Green
      : "text-black hover:text-brand-cyan"; // Nahi to Gray + Hover Brand Cyan
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">

            <img
              src="https://tekunik.in/wp-content/uploads/2019/11/tekunik-logo-DARK.png.webp"
              alt="Logo"
              className="h-8 w-auto"
            />

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-black ">
            {/* ✅ Har Link pe getLinkClass function use kiya */}
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
            <Link to="/about" className={getLinkClass("/about")}>
              About
            </Link>
            <Link to="/services" className={getLinkClass("/services")}>
              Services
            </Link>
            <Link to="/contact" className={getLinkClass("/contact")}>
              Contact
            </Link>

            {/* Desktop Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className={`cursor-pointer flex items-center gap-1 hover:text-brand-cyan ${
                  // Agar dropdown ke andar ka koi page open hai, to "Request Quote" bhi brand green dikhega
                  location.pathname === "/WebAppProject" ||
                    location.pathname === "/MobileAppProject"
                    ? "text-brand-green font-semibold"
                    : "text-black"
                  }`}
              >
                Request Quote
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 rounded border bg-white shadow-md overflow-hidden">
                  <Link
                    to="/WebAppProject"
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 hover:bg-gray-100 ${location.pathname === "/WebAppProject"
                        ? "text-brand-green bg-brand-green/10"
                        : "text-black"
                      }`}
                  >
                    Web Project
                  </Link>

                  <Link
                    to="/MobileAppProject"
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 hover:bg-gray-100 ${location.pathname === "/MobileAppProject"
                        ? "text-brand-green bg-brand-green/10"
                        : "text-black"
                      }`}
                  >
                    App Project
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              className="text-2xl text-black"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out
        ${mobileOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 font-medium">
          {/* ✅ Mobile Links pe bhi same function lagaya */}
          <Link
            to="/"
            className={getLinkClass("/")}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={getLinkClass("/about")}
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className={getLinkClass("/services")}
            onClick={() => setMobileOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={getLinkClass("/contact")}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          <div className="pt-2 border-t">
            <Link
              to="/webquestionnarie"
              className={`block py-2 ${location.pathname === "/webquestionnarie"
                  ? "text-brand-green"
                  : "text-black hover:text-brand-cyan"
                }`}
              onClick={() => setMobileOpen(false)}
            >
              Web Project
            </Link>

            <Link
              to="/mobilequestionnarie"
              className={`block py-2 ${location.pathname === "/mobilequestionnarie"
                  ? "text-brand-green"
                  : "text-black hover:text-brand-cyan"
                }`}
              onClick={() => setMobileOpen(false)}
            >
              App Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
import React, { useState } from "react";

const LOGO_PATH = "https://www.ruh.ac.lk/wp-content/themes/ruhuna/favicon.ico";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "User Roles", href: "#roles" },
  { name: "Team", href: "#team" },
];

export default function Header({ onSmoothScroll }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1250px]">
      <div
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-4"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 select-none">
          <img
            src={LOGO_PATH}
            alt="SmartBoAD Logo"
            className="h-12 w-auto rounded-xl animate-fade-in"
          />
          <div className="text-text leading-tight animate-slide-in">
            <strong className="block text-xl font-bold">SmartBoAD</strong>
            <small className="block text-xs text-muted">Boarding Management</small>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={onSmoothScroll}
              className="relative text-text font-semibold hover:text-primary transition-colors duration-300"
            >
              {link.name}
              {index < navLinks.length - 1 && (
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 h-4 w-px bg-primary/20"></span>
              )}
            </a>
          ))}

          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact
          </a>

          <a
            href="login.html"
            className="px-5 py-2 rounded-full bg-primary text-white font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`h-[3px] w-7 bg-text rounded transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] w-7 bg-text rounded transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[3px] w-7 bg-text rounded transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden mt-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 origin-top ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                onSmoothScroll();
                setOpen(false);
              }}
              className="p-3 rounded-xl hover:bg-primary/10 text-text font-semibold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            className="p-3 rounded-xl bg-white shadow hover:shadow-md transition-all duration-300"
          >
            Contact
          </a>

          <a
            href="login.html"
            className="p-3 rounded-xl bg-primary text-white font-semibold shadow hover:shadow-lg transition-all duration-300"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}

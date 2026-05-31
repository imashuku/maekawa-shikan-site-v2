"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { label: "ホーム", href: "/" },
    { label: "歴史の断片", href: "/#stories" },
    { label: "NOTE", href: "https://note.com/maekawa_shikan", external: true },
    { label: "イベント", href: "/#upcoming-event" },
    { label: "プロフィール", href: "/profile" },
    { label: "書籍化PJ", href: "/support", highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-kinari/90 backdrop-blur-sm border-b border-sumi/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif font-bold text-xl md:text-2xl text-sumi-dark tracking-widest z-50 relative" onClick={closeMenu}>
          それはまことですか？
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-serif text-sm tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`transition-colors duration-300 ${
                item.highlight
                  ? "bg-kokihi text-white px-5 py-2 rounded-sm hover:bg-sumi-dark shadow-sm"
                  : "text-sumi hover:text-kokihi relative group"
              }`}
            >
              {item.label}
              {!item.highlight && (
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-kokihi transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-sumi-dark transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-sumi-dark transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-sumi-dark transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={`fixed inset-0 bg-kinari z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 font-serif text-lg tracking-widest">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className={`transition-all duration-300 transform ${
                   isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${
                  item.highlight ? "text-kokihi font-bold text-xl mt-4" : "text-sumi-dark"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Decorative graphic for menu */}
          <div className="absolute bottom-8 opacity-10 animate-pulse-slow w-40 h-40">
             {/* Simple circle or kamon placeholder if needed */}
             <div className="w-full h-full border border-sumi rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

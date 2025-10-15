'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LanguageToggle from '@/components/ui/languageToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">ModularERP</span>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700">
          <Link href="#features" className="hover:text-black">
            Features
          </Link>
          <Link href="#modules" className="hover:text-black">
            Modules
          </Link>
          <Link href="#pricing" className="hover:text-black">
            Pricing
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/signin"
            className="px-4 py-1 border rounded-md hover:bg-gray-100"
          >
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

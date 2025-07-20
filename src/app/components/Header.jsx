"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FreshMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/best-sellers" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Best Sellers
            </Link>
            <Link href="/new-arrivals" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              New Arrivals
            </Link>
            <Link href="/inventory" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Inventory
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                // Close icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-48 opacity-100 border-t py-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/best-sellers" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
              onClick={closeMobileMenu}
            >
              Best Sellers
            </Link>
            <Link 
              href="/new-arrivals" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
              onClick={closeMobileMenu}
            >
              New Arrivals
            </Link>
            <Link 
              href="/inventory" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 rounded hover:bg-gray-50 transition-colors"
              onClick={closeMobileMenu}
            >
              Inventory
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
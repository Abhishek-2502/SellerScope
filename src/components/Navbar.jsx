import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const chartData = Array(10).fill().map((_, i) => ({
    name: i.toString(),
    value: Math.floor(Math.random() * 40) + 30
  }));

  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Dashboard', to: '/dashboard' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (profileDropdownOpen && !e.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, [profileDropdownOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 group">
              <div className="h-8 w-8 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                <span className="text-white">Seller</span>Scope
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.to
                      ? 'text-white bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Profile Dropdown */}
              <div className="profile-dropdown relative ml-4">
                <div
                  className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">
                    AD
                  </div>
                  <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-black border border-gray-700 rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">Admin User</p>
                      <p className="text-xs text-gray-400">admin@example.com</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Your Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Settings
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 flex items-center"
                    >
                      <LogOut size={14} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-black/95 backdrop-blur-md shadow-lg px-2 pt-2 pb-3 space-y-1 border-t border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.to
                    ? 'text-white bg-gray-800'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile profile */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs font-medium">AD</div>
                  <span className="ml-3 text-gray-300">Admin</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-md text-red-400 hover:text-red-300 hover:bg-gray-800"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-50">
        <div
          className="h-full bg-white"
          style={{
            width: `${(document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100}%`,
            transition: 'width 0.1s'
          }}
        />
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Login from './components/Login';
import PredictionForm from './components/PredictionForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-pulse text-blue-400 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Render Navbar if authenticated */}
        {isAuthenticated && <Navbar onLogout={handleLogout} />}

        {/* Content wrapper with padding to avoid overlap */}
        <div className="pt-20">
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Hero />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predict" element={<PredictionForm />} /> {/* 👈 New Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>

        {/* Render Footer if authenticated */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;

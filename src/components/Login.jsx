import React, { useState } from 'react';
import { User, Lock, AlertCircle, BarChart2, Shield, TrendingUp, Clock, ChevronRight, Info } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  const projectHighlights = [
    {
      icon: <BarChart2 size={20} className="text-white" />,
      title: "Sales Trends",
      description: "Analyzed 10,000+ Amazon SKUs across 12 months for revenue insights"
    },
    {
      icon: <TrendingUp size={20} className="text-white" />,
      title: "Market Intelligence",
      description: "Competitor tracking and category-wise ranking fluctuations"
    },
    {
      icon: <Shield size={20} className="text-white" />,
      title: "Pricing Optimization",
      description: "Identified optimal pricing ranges using ML-based models"
    }
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Animated background in grayscale */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/30 via-black to-gray-800/30"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-500/10 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gray-500/5 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Info Panel */}
        <div className="hidden lg:flex lg:col-span-2 flex-col">
          <div className="h-full bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/50 p-8 flex flex-col">
            <div className="flex items-center mb-8">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-white to-gray-300 flex items-center justify-center mr-4">
                <div className="text-2xl font-bold text-black">SS</div>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                <span className="text-white">Seller</span>Scope
              </h1>
            </div>

            <h2 className="text-xl font-semibold text-white mb-4">Amazon Seller Data Analysis Platform</h2>
            <p className="text-gray-300 mb-8">Gain data-driven insights into your Amazon sales performance, pricing strategies, and product visibility with powerful analytics and visualization tools.</p>

            <div className="space-y-6 mb-8">
              {projectHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-black/40 rounded-lg border border-gray-700/50">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{highlight.title}</h3>
                    <p className="text-sm text-gray-400">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Info size={18} className="text-white mr-2" />
                  <h3 className="text-white font-medium">Key Insights</h3>
                </div>
                <p className="text-sm text-gray-300">
                  The average conversion rate across categories was 12.5%. Electronics and home goods ranked highest in daily sales. Dynamic pricing increased revenue by 18% on selected products.
                </p>
                <button
                  onClick={() => setActiveTab('about')}
                  className="flex items-center text-sm text-white hover:text-gray-300 mt-2 transition-colors"
                >
                  Learn more <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Login/About Panel */}
        <div className="col-span-1 lg:col-span-3">
          <div className="h-full bg-black/60 backdrop-blur-xl rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
            {/* Tab navigation */}
            <div className="flex border-b border-gray-700/50">
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'login' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'about' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('about')}
              >
                About the Project
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <div className="p-8">
                <div className="mb-8 text-center">
                  <div className="flex items-center justify-center lg:hidden mb-6">
                    <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center mr-3">
                      <div className="text-2xl font-bold text-black">SS</div>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">SellerScope</h2>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-400 text-sm">Sign in to access your Amazon seller analytics dashboard</p>
                </div>

                {error && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
                    <AlertCircle size={18} className="mr-2" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm"
                        placeholder="admin"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm"
                        placeholder="password123"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
              </div>
            )}

            {/* About Panel */}
            {activeTab === 'about' && (
              <div className="p-8 text-gray-300 text-sm">
                <h3 className="text-white text-lg font-bold mb-4">About SellerScope</h3>
                <p>SellerScope is a robust analytics dashboard designed to help Amazon sellers gain insights from historical and real-time product data. The platform offers visualization tools, competitor intelligence, and pricing optimization techniques driven by ML algorithms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

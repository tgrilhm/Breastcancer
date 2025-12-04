import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Brain, Shield, Zap } from 'lucide-react';
import { PageType, UserRole } from '../App';
import logoImage from '../assets/logo.png';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cardsVisible: boolean;
  delay: number;
  gradientClass: string;
  hoverBorderClass: string;
}

function FeatureCard({
  icon,
  title,
  description,
  cardsVisible,
  delay,
  gradientClass,
  hoverBorderClass,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${hoverBorderClass} ${
        cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0 shadow-md`}
          style={{
            transform: isHovered ? 'scale(1.25)' : 'scale(1)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-blue-900 mb-2">{title}</h3>
          <p className="text-sm text-blue-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: PageType) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCardsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const role: UserRole = email.includes('doctor') || email.includes('dr.') ? 'doctor' : 'patient';
      setIsLoading(false);
      onLogin(role);
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4 lg:p-8 overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 rounded-3xl shadow-xl bg-white overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col p-6 lg:p-10 space-y-6">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={logoImage} 
              alt="MedVision AI Logo" 
              className="w-10 h-10 object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div>
              <h1 className="text-blue-700 font-bold text-xl">MedVision AI</h1>
              <p className="text-gray-500 text-sm">Intelligent Breast Cancer Screening Platform</p>
            </div>
          </div>

          {/* Single-Line Heading */}
          <div className="mb-6">
            <h2 className="text-gray-900 text-lg font-semibold leading-tight">
              Your Personal Breast Cancer Screening Detection Platform
            </h2>
            <p className="text-blue-600 text-sm mt-2">
              Advanced machine learning technology for accurate, reliable breast cancer screening and early detection.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <FeatureCard
              icon={<Brain className="text-white" size={26} />}
              title="Evidence-Based Analysis"
              description="Uses a machine learning model trained on real clinical data to help distinguish between benign and malignant cases."
              cardsVisible={cardsVisible}
              delay={0}
              gradientClass="from-blue-500 to-blue-600"
              hoverBorderClass="hover:border-blue-300"
            />

            <FeatureCard
              icon={<Shield className="text-white" size={26} />}
              title="Your Privacy Matters"
              description="All data you enter is processed locally and not stored or shared. This tool is designed for educational use with your privacy in mind."
              cardsVisible={cardsVisible}
              delay={100}
              gradientClass="from-pink-500 to-pink-600"
              hoverBorderClass="hover:border-pink-300"
            />

            <FeatureCard
              icon={<Zap className="text-white" size={26} />}
              title="Get Your Results Instantly"
              description="Input your clinical measurements and receive an immediate prediction. No waiting, no appointments, just fast insight to help guide your next steps."
              cardsVisible={cardsVisible}
              delay={200}
              gradientClass="from-purple-500 to-purple-600"
              hoverBorderClass="hover:border-purple-300"
            />
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6 lg:p-10">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <img 
              src={logoImage} 
              alt="MedVision AI Logo" 
              className="w-8 h-8 object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
            <div>
              <h1 className="text-blue-700 font-bold text-lg">MedVision AI</h1>
              <p className="text-gray-500 text-xs">Intelligent Breast Cancer Screening Platform</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-gray-800 text-xl font-bold">Welcome Back</h2>
            <p className="text-blue-600 mt-1">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
              {isLoading ? (
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              ) : (
                <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <Mail className="text-blue-500 flex-shrink-0" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full outline-none text-gray-800 placeholder:text-gray-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Password *</label>
              {isLoading ? (
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              ) : (
                <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  <Lock className="text-blue-500 flex-shrink-0" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full outline-none text-gray-800 placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-600 
             disabled:opacity-70 
             text-white py-3 px-6 rounded-xl 
             flex items-center justify-center gap-2 
             shadow-md 
             hover:shadow-xl 
             transition-all duration-300 
             transform hover:-translate-y-0.5 
             group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight 
        size={20} 
        className="transition-transform duration-300 group-hover:translate-x-1" 
      />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to MedVision?</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('signup')}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-xl transition-colors"
          >
            Create an Account
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="font-medium">Patient:</span>
                <span>patient@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="font-medium">Doctor:</span>
                <span>doctor@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

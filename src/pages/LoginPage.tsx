import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { PageType, UserRole } from '../App';
import logoImage from 'figma:asset/2e11abbf4aa9a74ca76cc202d87347218d0c5332.png';

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate backend authentication
    setTimeout(() => {
      // Determine role based on email domain (simulated backend logic)
      const role: UserRole = email.includes('doctor') || email.includes('dr.') ? 'doctor' : 'patient';
      setIsLoading(false);
      onLogin(role);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="space-y-8">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <img 
                src={logoImage} 
                alt="MedVision AI Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-blue-600 mb-1 text-2xl">MedVision AI</h1>
                <p className="text-sm text-gray-600">Intelligent Breast Cancer Screening Platform</p>
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <h2 className="text-gray-800 mb-3">Your Personal Breast Cancer Screening Detection Platform</h2>
              <p className="text-blue-600 leading-relaxed">
                Advanced machine learning technology for accurate, reliable breast cancer screening and early detection.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {/* Feature 1 - Evidence-Based */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">Evidence-Based Analysis</h3>
                    <p className="text-sm text-blue-600 leading-relaxed">
                      Uses a machine learning model trained on real clinical data to help distinguish between benign and malignant cases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Privacy */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">Your Privacy Matters</h3>
                    <p className="text-sm text-blue-600 leading-relaxed">
                      All data you enter is processed locally and not stored or shared. This tool is designed for educational use with your privacy in mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 - Instant Results */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-2">Get Your Results Instantly</h3>
                    <p className="text-sm text-blue-600 leading-relaxed">
                      Input your clinical measurements and receive an immediate prediction. No waiting, no appointments, just fast insight to help guide your next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <img 
              src={logoImage} 
              alt="MedVision Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-blue-600">MedVision</h1>
              <p className="text-xs text-blue-600">Intelligent Breast Cancer Screening Platform</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-gray-800 mb-2">Sign In to Your Account</h2>
            <p className="text-blue-600">Enter your credentials to access the platform</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" 
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white py-3.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-600">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <button
            onClick={() => onNavigate('signup')}
            className="w-full text-blue-600 hover:text-blue-800 py-3 text-center transition-colors"
          >
            Create Account
          </button>

          {/* Demo Credentials */}
          <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-700 mb-3">Demo Credentials:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Patient: patient@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span>Doctor: doctor@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Brain, Shield, Users } from 'lucide-react';
import { PageType, UserRole } from '../App';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Enhanced Branding & Features */}
        <div className="hidden lg:flex flex-col justify-center relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Logo & Branding */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <ellipse cx="50" cy="50" rx="45" ry="25" fill="#3B82F6" opacity="0.2"/>
                    <ellipse cx="50" cy="50" rx="35" ry="20" fill="#3B82F6" opacity="0.3"/>
                    <circle cx="50" cy="50" r="12" fill="#1E40AF"/>
                    <circle cx="52" cy="48" r="4" fill="white"/>
                    <path d="M 70 35 Q 75 25 80 30 Q 85 35 80 40 Q 75 45 70 50 Q 75 55 80 60 Q 85 65 80 70 Q 75 75 70 65" 
                          fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="80" cy="30" r="2" fill="#EC4899"/>
                    <circle cx="80" cy="70" r="2" fill="#EC4899"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-blue-900 mb-1">MedVision</h1>
                  <p className="text-sm text-blue-600">Breast Cancer Screening Platform</p>
                </div>
              </div>
              
              <h2 className="text-blue-900 mb-3 leading-tight">
                Your AI-Powered<br />Breast Health Companion
              </h2>
              <p className="text-blue-600 text-lg">
                Advanced machine learning technology for accurate, reliable breast cancer screening and early detection.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Brain className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-1">Advanced AI Analysis</h3>
                    <p className="text-sm text-blue-600">
                      State-of-the-art machine learning algorithms trained on millions of data points for accurate screening
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md border border-blue-100 hover:shadow-xl hover:border-pink-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-1">Secure & Compliant</h3>
                    <p className="text-sm text-blue-600">
                      HIPAA compliant with enterprise-grade encryption and security protocols to protect your data
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white rounded-2xl p-5 shadow-md border border-blue-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-1">Real-time Collaboration</h3>
                    <p className="text-sm text-blue-600">
                      Seamlessly connect with board-certified specialists and get expert consultation instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-700 text-center">
                <span className="text-blue-900">Trusted by healthcare professionals worldwide</span>
                <br />
                <span className="text-blue-600">99.2% accuracy rate • 1M+ screenings performed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 p-8">
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <ellipse cx="50" cy="50" rx="45" ry="25" fill="#3B82F6" opacity="0.2"/>
                <circle cx="50" cy="50" r="12" fill="#1E40AF"/>
                <circle cx="52" cy="48" r="4" fill="white"/>
              </svg>
            </div>
            <h1 className="text-blue-900">MedVision</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-blue-900 mb-2">Sign In to Your Account</h2>
            <p className="text-blue-600">Enter your credentials to access the platform</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-12 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 transition-all" />
                <span className="text-sm text-blue-700 group-hover:text-blue-900 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 disabled:from-blue-400 disabled:to-pink-400 text-white py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
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

          {/* Sign Up Link */}
          <div className="mt-6 text-center pt-6 border-t border-blue-100">
            <p className="text-blue-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-700 hover:text-blue-900 hover:underline transition-all"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 mb-2">Demo Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs text-blue-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Patient: patient@example.com
              </p>
              <p className="text-xs text-blue-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                Doctor: doctor@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

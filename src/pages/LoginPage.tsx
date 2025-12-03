import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Brain, Shield, Zap } from 'lucide-react';
import { PageType, UserRole } from '../App';
import logoImage from 'figma:asset/e2c4d4e1abf2de2789813e174f4e7001b28dcd00.png';

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
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Enhanced Branding & Features */}
        <div className="hidden lg:flex flex-col justify-center relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Logo & Branding */}
            <div className="mb-10">
              <div className="mb-8">
                <img 
                  src={logoImage} 
                  alt="MedVision Logo" 
                  className="w-32 h-32 object-contain mb-6" 
                  style={{ mixBlendMode: 'multiply' }}
                />
                <h1 className="text-blue-900 mb-2">MedVision</h1>
              </div>
              
              <h2 className="text-blue-900 mb-4 leading-tight">
                Your Personal Breast Cancer<br />Screening Detection Platform
              </h2>
              <p className="text-blue-700 leading-relaxed">
                Advanced machine learning technology for accurate, reliable breast cancer screening and early detection.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Brain className="text-white" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-2">Evidence-Based Analysis</h3>
                    <p className="text-sm text-blue-600 leading-relaxed">
                      Uses a machine learning model trained on real clinical data to help distinguish between benign and malignant cases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-pink-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Shield className="text-white" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-2">Your Privacy Matters</h3>
                    <p className="text-sm text-blue-600 leading-relaxed">
                      All data you enter is processed locally and not stored or shared. This tool is designed for educational use with your privacy in mind.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Zap className="text-white" size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-blue-900 mb-2">Get Your Results Instantly</h3>
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
        <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-10">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <img 
              src={logoImage} 
              alt="MedVision Logo" 
              className="w-24 h-24 object-contain mb-4" 
              style={{ mixBlendMode: 'multiply' }}
            />
            <h1 className="text-blue-900">MedVision</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-blue-900 mb-3">Welcome Back</h2>
            <p className="text-blue-600">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-4 py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-blue-900"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-12 pr-12 py-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-blue-900"
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
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded border-blue-300 focus:ring-blue-500 transition-all cursor-pointer" 
                />
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
              className="w-full bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 disabled:from-blue-400 disabled:to-pink-400 text-white py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              <div className="w-full border-t border-blue-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-blue-600">New to MedVision?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <button
            onClick={() => onNavigate('signup')}
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 px-6 rounded-xl transition-all transform hover:-translate-y-0.5"
          >
            Create an Account
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-800 mb-3">Demo Credentials</p>
            <div className="space-y-2">
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

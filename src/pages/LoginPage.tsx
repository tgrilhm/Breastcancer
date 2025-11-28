import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { PageType, UserRole } from '../App';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (page: PageType) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
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
              <h1 className="text-blue-900">MedVision</h1>
              <p className="text-blue-600">Breast Cancer Screening Platform</p>
            </div>
          </div>
          
          <h2 className="text-blue-900 mb-4">Welcome Back</h2>
          <p className="text-blue-600 mb-6">
            AI-powered breast cancer screening and management platform trusted by healthcare professionals worldwide.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">✓</div>
              <div>
                <p className="text-blue-900">Advanced AI Analysis</p>
                <p className="text-sm text-blue-600">State-of-the-art machine learning for accurate screening</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 flex-shrink-0">✓</div>
              <div>
                <p className="text-blue-900">Secure & Compliant</p>
                <p className="text-sm text-blue-600">HIPAA compliant with enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">✓</div>
              <div>
                <p className="text-blue-900">Real-time Collaboration</p>
                <p className="text-sm text-blue-600">Connect patients with specialists instantly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
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

          <h2 className="text-blue-900 mb-2">Sign In</h2>
          <p className="text-blue-600 mb-6">Choose your role and enter your credentials</p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === 'patient'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className={role === 'patient' ? 'text-blue-900' : 'text-gray-700'}>I am a Patient</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === 'doctor'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className={role === 'doctor' ? 'text-blue-900' : 'text-gray-700'}>Medical Professional</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-blue-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500" />
                <span className="text-sm text-blue-700">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group"
            >
              <span>Sign In</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-blue-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-700 hover:text-blue-900"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

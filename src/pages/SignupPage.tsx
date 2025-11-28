import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, MapPin, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { PageType } from '../App';

interface SignupPageProps {
  onNavigate: (page: PageType) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    insurance: '',
    specialty: '',
    licenseNumber: '',
    hospital: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    onNavigate('login');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              s === step
                ? 'bg-blue-600 text-white'
                : s < step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s < step ? '✓' : s}
          </div>
          {s < 3 && (
            <div
              className={`w-16 h-1 transition-all ${
                s < step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderRoleSelection = () => (
    <div>
      <h2 className="text-blue-900 mb-2 text-center">Choose Your Role</h2>
      <p className="text-blue-600 mb-6 text-center">Select how you'll be using MedVision</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => {
            setRole('patient');
            setStep(2);
          }}
          className="p-6 rounded-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
            <User className="text-blue-600 group-hover:text-white" size={24} />
          </div>
          <h3 className="text-blue-900 mb-2">I am a Patient</h3>
          <p className="text-sm text-blue-600">
            Get AI-powered breast cancer screening and connect with specialists
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole('doctor');
            setStep(2);
          }}
          className="p-6 rounded-xl border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
        >
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
            <Shield className="text-pink-600 group-hover:text-white" size={24} />
          </div>
          <h3 className="text-blue-900 mb-2">Medical Professional</h3>
          <p className="text-sm text-blue-600">
            Review patient cases, manage appointments, and collaborate with teams
          </p>
        </button>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div>
      <h2 className="text-blue-900 mb-2">Personal Information</h2>
      <p className="text-blue-600 mb-6">Tell us about yourself</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-900 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-900 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Date of Birth *</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Gender *</label>
          <div className="grid grid-cols-3 gap-3">
            {['Female', 'Male', 'Other'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setFormData({ ...formData, gender: g })}
                className={`py-3 rounded-xl border-2 transition-all ${
                  formData.gender === g
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 text-gray-700 hover:border-blue-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>

        {role === 'patient' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-900 mb-2">Emergency Contact Name</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-blue-900 mb-2">Emergency Contact Phone</label>
                <input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 987-6543"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-900 mb-2">Insurance Provider</label>
              <input
                type="text"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Insurance Company Name"
              />
            </div>
          </>
        )}

        {role === 'doctor' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-900 mb-2">Medical Specialty *</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Specialty</option>
                  <option value="radiology">Radiology</option>
                  <option value="oncology">Oncology</option>
                  <option value="surgery">Surgery</option>
                  <option value="general">General Practice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-blue-900 mb-2">Medical License Number *</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MD-123456"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-900 mb-2">Hospital/Clinic Affiliation</label>
              <input
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Medical Center Name"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div>
      <h2 className="text-blue-900 mb-2">Security & Password</h2>
      <p className="text-blue-600 mb-6">Create a secure password for your account</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-blue-900 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a strong password"
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
          <p className="text-xs text-blue-600 mt-2">
            Must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Confirm Password *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter your password"
            required
          />
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h4 className="text-blue-900 mb-2">Password Requirements:</h4>
          <ul className="space-y-1 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}>✓</span>
              At least 8 characters
            </li>
            <li className="flex items-center gap-2">
              <span className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>✓</span>
              One uppercase letter
            </li>
            <li className="flex items-center gap-2">
              <span className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>✓</span>
              One lowercase letter
            </li>
            <li className="flex items-center gap-2">
              <span className={/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}>✓</span>
              One number
            </li>
          </ul>
        </div>

        <div className="border-t border-blue-100 pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded border-blue-300 focus:ring-blue-500 mt-1"
              required
            />
            <span className="text-sm text-blue-700">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
              . I understand that MedVision is HIPAA compliant and my data will be securely stored.
            </span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors group"
        >
          Create Account
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto py-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <ellipse cx="50" cy="50" rx="45" ry="25" fill="#3B82F6" opacity="0.2"/>
              <circle cx="50" cy="50" r="12" fill="#1E40AF"/>
              <circle cx="52" cy="48" r="4" fill="white"/>
              <path d="M 70 35 Q 75 25 80 30 Q 85 35 80 40 Q 75 45 70 50 Q 75 55 80 60 Q 85 65 80 70 Q 75 75 70 65" 
                    fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="80" cy="30" r="2" fill="#EC4899"/>
              <circle cx="80" cy="70" r="2" fill="#EC4899"/>
            </svg>
          </div>
          <h1 className="text-blue-900">MedVision</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderRoleSelection()}
            {step === 2 && renderPersonalInfo()}
            {step === 3 && renderSecurityInfo()}
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center pt-6 border-t border-blue-100">
            <p className="text-blue-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-700 hover:text-blue-900"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

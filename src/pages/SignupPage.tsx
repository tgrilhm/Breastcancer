import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Calendar, MapPin, Shield, ArrowRight, ArrowLeft, AlertCircle, Check } from 'lucide-react';
import { PageType } from '../App';

interface SignupPageProps {
  onNavigate: (page: PageType) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialty: '',
    licenseNumber: '',
    hospital: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    if (role === 'patient') {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    }

    if (role === 'doctor') {
      if (!formData.specialty) newErrors.specialty = 'Specialty is required';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.hospital.trim()) newErrors.hospital = 'Hospital affiliation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      // Handle signup logic
      onNavigate('login');
    }
  };

  const handleNext = () => {
    if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              s === step
                ? 'bg-blue-600 text-white shadow-lg scale-110'
                : s < step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s < step ? <Check size={20} /> : s}
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
      <p className="text-blue-600 mb-6">All fields are required</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-900 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.fullName ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-blue-900 mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Date of Birth *</label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => {
                setFormData({ ...formData, dateOfBirth: e.target.value });
                if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
            />
            {errors.dateOfBirth && <p className="text-xs text-red-600 mt-1">{errors.dateOfBirth}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Gender *</label>
          <div className="grid grid-cols-2 gap-3">
            {['Male', 'Female'].map((g) => (
              <label
                key={g}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.gender === g
                    ? 'border-blue-600 bg-blue-50'
                    : errors.gender
                    ? 'border-red-300 bg-red-50'
                    : 'border-blue-200 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: '' });
                  }}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-blue-900">{g}</span>
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Address *</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              if (errors.address) setErrors({ ...errors, address: '' });
            }}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.address ? 'border-red-300 bg-red-50' : 'border-blue-200'
            }`}
            placeholder="123 Main St, City, State, ZIP"
          />
          {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
        </div>

        {role === 'patient' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-900 mb-2">Emergency Contact Name *</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => {
                  setFormData({ ...formData, emergencyContact: e.target.value });
                  if (errors.emergencyContact) setErrors({ ...errors, emergencyContact: '' });
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.emergencyContact ? 'border-red-300 bg-red-50' : 'border-blue-200'
                }`}
                placeholder="Jane Doe"
              />
              {errors.emergencyContact && <p className="text-xs text-red-600 mt-1">{errors.emergencyContact}</p>}
            </div>

            <div>
              <label className="block text-sm text-blue-900 mb-2">Emergency Contact Phone *</label>
              <input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => {
                  setFormData({ ...formData, emergencyPhone: e.target.value });
                  if (errors.emergencyPhone) setErrors({ ...errors, emergencyPhone: '' });
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.emergencyPhone ? 'border-red-300 bg-red-50' : 'border-blue-200'
                }`}
                placeholder="+1 (555) 987-6543"
              />
              {errors.emergencyPhone && <p className="text-xs text-red-600 mt-1">{errors.emergencyPhone}</p>}
            </div>
          </div>
        )}

        {role === 'doctor' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-blue-900 mb-2">Medical Specialty *</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => {
                    setFormData({ ...formData, specialty: e.target.value });
                    if (errors.specialty) setErrors({ ...errors, specialty: '' });
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.specialty ? 'border-red-300 bg-red-50' : 'border-blue-200'
                  }`}
                >
                  <option value="">Select Specialty</option>
                  <option value="radiology">Radiology</option>
                  <option value="oncology">Oncology</option>
                  <option value="surgery">Surgery</option>
                  <option value="general">General Practice</option>
                </select>
                {errors.specialty && <p className="text-xs text-red-600 mt-1">{errors.specialty}</p>}
              </div>

              <div>
                <label className="block text-sm text-blue-900 mb-2">Medical License Number *</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, licenseNumber: e.target.value });
                    if (errors.licenseNumber) setErrors({ ...errors, licenseNumber: '' });
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.licenseNumber ? 'border-red-300 bg-red-50' : 'border-blue-200'
                  }`}
                  placeholder="MD-123456"
                />
                {errors.licenseNumber && <p className="text-xs text-red-600 mt-1">{errors.licenseNumber}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-900 mb-2">Hospital/Clinic Affiliation *</label>
              <input
                type="text"
                value={formData.hospital}
                onChange={(e) => {
                  setFormData({ ...formData, hospital: e.target.value });
                  if (errors.hospital) setErrors({ ...errors, hospital: '' });
                }}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.hospital ? 'border-red-300 bg-red-50' : 'border-blue-200'
                }`}
                placeholder="Medical Center Name"
              />
              {errors.hospital && <p className="text-xs text-red-600 mt-1">{errors.hospital}</p>}
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
          onClick={handleNext}
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
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm text-blue-900 mb-2">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-blue-200'
              }`}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
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
          <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-all ${
            errors.acceptTerms ? 'bg-red-50 border border-red-200' : ''
          }`}>
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => {
                setFormData({ ...formData, acceptTerms: e.target.checked });
                if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: '' });
              }}
              className="w-5 h-5 text-blue-600 rounded border-blue-300 focus:ring-blue-500 mt-1"
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
              . I understand that MedVision is HIPAA compliant and my data will be securely stored. *
            </span>
          </label>
          {errors.acceptTerms && <p className="text-xs text-red-600 mt-1">{errors.acceptTerms}</p>}
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
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors group shadow-md hover:shadow-lg"
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
                className="text-blue-700 hover:text-blue-900 hover:underline transition-all"
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

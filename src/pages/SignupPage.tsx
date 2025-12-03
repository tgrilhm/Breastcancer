import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, User, Shield, ArrowRight, ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { PageType } from '../App';
import logoImage from '../assets/logo.png';

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
      onNavigate('login');
    }
  };

  const handleNext = () => {
    if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {[
        { num: 1, label: 'Role Selection' },
        { num: 2, label: 'Personal Info' },
        { num: 3, label: 'Security' }
      ].map((s, idx) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${ 
                s.num === step
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                  : s.num < step
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s.num < step ? <Check size={24} strokeWidth={3} /> : <span className="text-lg font-bold">{s.num}</span>}
            </div>
            <span className={`text-xs mt-2 font-medium ${s.num === step ? 'text-blue-600' : 'text-gray-500'}`}>
              {s.label}
            </span>
          </div>
          {idx < 2 && (
            <div className={`w-24 h-1 mx-4 mb-6 rounded-full transition-all ${s.num < step ? 'bg-green-500' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderRoleSelection = () => (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-gray-800 mb-3 text-3xl">Choose Your Account Type</h2>
        <p className="text-gray-600 text-lg">Select the option that best describes you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => {
            setRole('patient');
            setStep(2);
          }}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 bg-white hover:shadow-2xl transition-all duration-300 text-left transform hover:-translate-y-2"
        >
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center transition-all">
            <ArrowRight className="text-blue-500 group-hover:text-white" size={20} />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-500 group-hover:to-purple-600 flex items-center justify-center mb-6 transition-all shadow-md">
            <User className="text-blue-600 group-hover:text-white transition-colors" size={36} />
          </div>
          <h3 className="text-gray-800 mb-3 text-xl">I'm a Patient</h3>
          <p className="text-gray-600 leading-relaxed">
            Check your breast health by entering your clinical test results and get instant AI-powered analysis
          </p>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole('doctor');
            setStep(2);
          }}
          className="group relative p-8 rounded-2xl border-2 border-gray-200 hover:border-pink-500 bg-white hover:shadow-2xl transition-all duration-300 text-left transform hover:-translate-y-2"
        >
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-pink-100 group-hover:bg-pink-500 flex items-center justify-center transition-all">
            <ArrowRight className="text-pink-500 group-hover:text-white" size={20} />
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 group-hover:from-pink-500 group-hover:to-purple-600 flex items-center justify-center mb-6 transition-all shadow-md">
            <Shield className="text-pink-600 group-hover:text-white transition-colors" size={36} />
          </div>
          <h3 className="text-gray-800 mb-3 text-xl">I'm a Medical Professional</h3>
          <p className="text-gray-600 leading-relaxed">
            Review patient cases, manage appointments, and collaborate with healthcare teams
          </p>
        </button>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-gray-800 mb-3 text-3xl">Personal Information</h2>
        <p className="text-gray-600 text-lg">Please fill in all required fields to continue</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="+20 10 1234 5678"
              />
              {errors.phone && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">Date of Birth *</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => {
                  setFormData({ ...formData, dateOfBirth: e.target.value });
                  if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
                }}
                className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.dateOfBirth ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
              />
              {errors.dateOfBirth && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.dateOfBirth}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-3 font-medium">Gender *</label>
            <div className="grid grid-cols-2 gap-4">
              {['Male', 'Female'].map((g) => (
                <label
                  key={g}
                  className={`relative flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.gender === g
                      ? 'border-blue-500 bg-blue-50'
                      : errors.gender
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
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
                  <span className="text-gray-800 font-medium">{g}</span>
                  {formData.gender === g && (
                    <CheckCircle2 className="absolute right-4 text-blue-600" size={20} />
                  )}
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.address ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="123 Main St, City, State, ZIP"
            />
            {errors.address && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.address}</p>}
          </div>

          {role === 'patient' && (
            <>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-gray-800 mb-4 font-semibold">Emergency Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Emergency Contact Name *</label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => {
                        setFormData({ ...formData, emergencyContact: e.target.value });
                        if (errors.emergencyContact) setErrors({ ...errors, emergencyContact: '' });
                      }}
                      className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.emergencyContact ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Jane Doe"
                    />
                    {errors.emergencyContact && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.emergencyContact}</p>}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Emergency Contact Phone *</label>
                    <input
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, emergencyPhone: e.target.value });
                        if (errors.emergencyPhone) setErrors({ ...errors, emergencyPhone: '' });
                      }}
                      className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.emergencyPhone ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="+20 11 9876 5432"
                    />
                    {errors.emergencyPhone && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.emergencyPhone}</p>}
                  </div>
                </div>
              </div>
            </>
          )}

          {role === 'doctor' && (
            <>
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-gray-800 mb-4 font-semibold">Professional Information</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2 font-medium">Medical Specialty *</label>
                      <select
                        value={formData.specialty}
                        onChange={(e) => {
                          setFormData({ ...formData, specialty: e.target.value });
                          if (errors.specialty) setErrors({ ...errors, specialty: '' });
                        }}
                        className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.specialty ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select Specialty</option>
                        <option value="radiology">Radiology</option>
                        <option value="oncology">Oncology</option>
                        <option value="surgery">Surgery</option>
                        <option value="general">General Practice</option>
                      </select>
                      {errors.specialty && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.specialty}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2 font-medium">Medical License Number *</label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, licenseNumber: e.target.value });
                          if (errors.licenseNumber) setErrors({ ...errors, licenseNumber: '' });
                        }}
                        className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.licenseNumber ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                        }`}
                        placeholder="MD-123456"
                      />
                      {errors.licenseNumber && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.licenseNumber}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Hospital/Clinic Affiliation *</label>
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => {
                        setFormData({ ...formData, hospital: e.target.value });
                        if (errors.hospital) setErrors({ ...errors, hospital: '' });
                      }}
                      className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.hospital ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Medical Center Name"
                    />
                    {errors.hospital && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.hospital}</p>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl font-semibold"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderSecurityInfo = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-gray-800 mb-3 text-3xl">Secure Your Account</h2>
        <p className="text-gray-600 text-lg">Create a strong password to protect your information</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className={`w-full px-4 py-3.5 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className={`w-full px-4 py-3.5 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.confirmPassword}</p>}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h4 className="text-gray-800 mb-4 font-semibold">Password Requirements</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'At least 8 characters', check: formData.password.length >= 8 },
                { label: 'One uppercase letter', check: /[A-Z]/.test(formData.password) },
                { label: 'One lowercase letter', check: /[a-z]/.test(formData.password) },
                { label: 'One number', check: /[0-9]/.test(formData.password) }
              ].map((req, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.check ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {req.check && <Check className="text-white" size={14} strokeWidth={3} />}
                  </div>
                  <span className={`text-sm ${req.check ? 'text-gray-800' : 'text-gray-500'}`}>{req.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-lg transition-all ${
              errors.acceptTerms ? 'bg-red-50 border-2 border-red-400' : 'hover:bg-gray-50'
            }`}>
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => {
                  setFormData({ ...formData, acceptTerms: e.target.checked });
                  if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: '' });
                }}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 cursor-pointer"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </button>
                . I understand that my data will be securely stored and handled in compliance with privacy regulations.
              </span>
            </label>
            {errors.acceptTerms && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><span>⚠</span>{errors.acceptTerms}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg transition-all group shadow-lg hover:shadow-xl font-semibold"
        >
          Create Account
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <img 
            src={logoImage} 
            alt="MedVision AI Logo" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-blue-600 text-2xl">MedVision AI</h1>
            <p className="text-sm text-gray-600">Intelligent Breast Cancer Screening Platform</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderRoleSelection()}
            {step === 2 && renderPersonalInfo()}
            {step === 3 && renderSecurityInfo()}
          </form>

          {/* Login Link */}
          <div className="mt-10 text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-all"
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

import React from 'react';
import { useState } from 'react';
import { Header } from '../components/Header';
import { DoctorHeader } from '../components/DoctorHeader';
import { PatientSidebar } from '../components/PatientSidebar';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { Camera, Save, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { PageType, UserRole } from '../App';

interface ProfilePageProps {
  userRole: UserRole;
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export function ProfilePage({ userRole, onLogout, onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: userRole === 'doctor' ? 'Dr. Emily Carter' : 'Sarah Johnson',
    email: userRole === 'doctor' ? 'emily.carter@medvision.com' : 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    address: '123 Main Street, San Francisco, CA 94122',
    specialty: 'Breast Imaging Specialist',
    licenseNumber: 'MD-CA-123456',
    hospital: 'Medical Center Downtown',
    emergencyContact: 'John Johnson',
    emergencyPhone: '+1 (555) 987-6543',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle save logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {userRole === 'doctor' ? (
        <DoctorHeader onLogout={onLogout} />
      ) : (
        <Header onLogout={onLogout} />
      )}
      
      <div className="flex">
        {userRole === 'doctor' ? (
          <DoctorSidebar onNavigate={onNavigate} activePage="profile" />
        ) : (
          <PatientSidebar onNavigate={onNavigate} activePage="profile" />
        )}
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-blue-900 mb-2">My Profile</h1>
              <p className="text-blue-600">Manage your personal information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white text-4xl">
                        {profileData.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                        <Camera size={18} />
                      </button>
                    </div>
                    
                    <h2 className="text-blue-900 mb-1">{profileData.fullName}</h2>
                    {userRole === 'doctor' && (
                      <p className="text-blue-600 mb-2">{profileData.specialty}</p>
                    )}
                    <p className="text-sm text-blue-600">
                      {userRole === 'doctor' ? 'Medical Professional' : 'Patient'}
                    </p>

                    <div className="mt-6 pt-6 border-t border-blue-100 space-y-3 text-left">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-blue-500" />
                        <span className="text-blue-700">{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-blue-500" />
                        <span className="text-blue-700">{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={16} className="text-blue-500" />
                        <span className="text-blue-700">{profileData.address.split(',')[0]}</span>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                  <h3 className="text-blue-900 mb-4">Personal Information</h3>
                  
                  <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-blue-900 mb-2">Address</label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      />
                    </div>

                    {userRole === 'doctor' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-blue-900 mb-2">Medical Specialty</label>
                            <input
                              type="text"
                              value={profileData.specialty}
                              onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                              disabled={!isEditing}
                              className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                !isEditing ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-blue-900 mb-2">License Number</label>
                            <input
                              type="text"
                              value={profileData.licenseNumber}
                              disabled={!isEditing}
                              className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                !isEditing ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-blue-900 mb-2">Hospital/Clinic Affiliation</label>
                          <input
                            type="text"
                            value={profileData.hospital}
                            onChange={(e) => setProfileData({ ...profileData, hospital: e.target.value })}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              !isEditing ? 'bg-gray-50' : ''
                            }`}
                          />
                        </div>

                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-blue-900 mb-2">Emergency Contact Name</label>
                            <input
                              type="text"
                              value={profileData.emergencyContact}
                              onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                              disabled={!isEditing}
                              className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                !isEditing ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-blue-900 mb-2">Emergency Contact Phone</label>
                            <input
                              type="tel"
                              value={profileData.emergencyPhone}
                              onChange={(e) => setProfileData({ ...profileData, emergencyPhone: e.target.value })}
                              disabled={!isEditing}
                              className={`w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                !isEditing ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>
                        </div>

                      </>
                    )}

                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <Save size={20} />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

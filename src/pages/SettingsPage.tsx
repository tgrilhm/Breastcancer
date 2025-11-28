import { useState } from 'react';
import { Header } from '../components/Header';
import { DoctorHeader } from '../components/DoctorHeader';
import { PatientSidebar } from '../components/PatientSidebar';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { Globe, Bell, Lock, Eye, EyeOff, CreditCard, Trash2, AlertTriangle } from 'lucide-react';
import { PageType, UserRole } from '../App';

interface SettingsPageProps {
  userRole: UserRole;
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export function SettingsPage({ userRole, onLogout, onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'PST',
    emailNotifications: true,
    smsNotifications: false,
    appNotifications: true,
    appointmentReminders: true,
    resultsNotifications: true,
    marketingEmails: false,
    dataSharing: true,
    profileVisibility: 'private',
    twoFactorAuth: true,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveSettings = () => {
    // Handle save logic
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
    setShowPasswordChange(false);
    setPasswordData({ current: '', new: '', confirm: '' });
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
          <DoctorSidebar onNavigate={onNavigate} activePage="settings" />
        ) : (
          <PatientSidebar onNavigate={onNavigate} activePage="settings" />
        )}
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-blue-900 mb-2">Settings</h1>
              <p className="text-blue-600">Manage your account preferences and privacy settings</p>
            </div>

            <div className="space-y-6">
              {/* General Settings */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="text-blue-600" size={24} />
                  <h2 className="text-blue-900">General Settings</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-blue-900 mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-blue-900 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PST">Pacific Time (PST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="EST">Eastern Time (EST)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="text-blue-600" size={24} />
                  <h2 className="text-blue-900">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-blue-900">Email Notifications</p>
                      <p className="text-sm text-blue-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-blue-900">SMS Notifications</p>
                      <p className="text-sm text-blue-600">Receive text message alerts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-blue-900">App Notifications</p>
                      <p className="text-sm text-blue-600">Push notifications in-app</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.appNotifications}
                        onChange={(e) => setSettings({ ...settings, appNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="border-t border-blue-100 pt-4 mt-4">
                    <p className="text-sm text-blue-900 mb-3">Specific Notifications</p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.appointmentReminders}
                          onChange={(e) => setSettings({ ...settings, appointmentReminders: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-blue-700">Appointment reminders</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.resultsNotifications}
                          onChange={(e) => setSettings({ ...settings, resultsNotifications: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-blue-700">Test results notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.marketingEmails}
                          onChange={(e) => setSettings({ ...settings, marketingEmails: e.target.checked })}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-blue-700">Marketing and promotional emails</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="text-blue-600" size={24} />
                  <h2 className="text-blue-900">Security Settings</h2>
                </div>

                <div className="space-y-4">
                  {!showPasswordChange ? (
                    <button
                      onClick={() => setShowPasswordChange(true)}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                    >
                      Change Password
                    </button>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-4 p-4 bg-blue-50 rounded-xl">
                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordData.current}
                          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-blue-900 mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordData.new}
                          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-blue-900 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                          className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowPasswordChange(false)}
                          className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-blue-900">Two-Factor Authentication (2FA)</p>
                      <p className="text-sm text-blue-600">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="text-blue-600" size={24} />
                  <h2 className="text-blue-900">Privacy Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-blue-900">Data Sharing for Research</p>
                      <p className="text-sm text-blue-600">Help improve AI models (anonymized)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.dataSharing}
                        onChange={(e) => setSettings({ ...settings, dataSharing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm text-blue-900 mb-2">Profile Visibility</label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                      className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="private">Private (Only visible to assigned doctors)</option>
                      <option value="network">Network (Visible to medical professionals in your network)</option>
                      <option value="public">Public (Visible in doctor search)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subscription/Billing (if applicable) */}
              {userRole === 'patient' && (
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-blue-600" size={24} />
                    <h2 className="text-blue-900">Subscription & Billing</h2>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-blue-900 mb-1">Free Plan</h3>
                        <p className="text-sm text-blue-600">Basic screening features</p>
                      </div>
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">Active</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors">
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              <div className="bg-white rounded-2xl shadow-md border border-red-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="text-red-600" size={24} />
                  <h2 className="text-red-900">Danger Zone</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <h3 className="text-red-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                >
                  Save All Settings
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h2 className="text-blue-900 mb-2">Delete Account?</h2>
              <p className="text-blue-600">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

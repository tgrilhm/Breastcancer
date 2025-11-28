import { useState } from 'react';
import { Header } from '../components/Header';
import { DoctorHeader } from '../components/DoctorHeader';
import { PatientSidebar } from '../components/PatientSidebar';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { Calendar as CalendarIcon, List, Clock, MapPin, User, Plus, X, Check } from 'lucide-react';
import { PageType, UserRole } from '../App';

interface AppointmentsPageProps {
  userRole: UserRole;
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

interface Appointment {
  id: string;
  patientName?: string;
  doctorName?: string;
  date: string;
  time: string;
  location: string;
  reason: string;
  status: 'upcoming' | 'past' | 'canceled';
  type: string;
}

const appointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Emily Carter',
    patientName: 'Sarah Johnson',
    date: '2024-11-30',
    time: '10:00 AM',
    location: 'Medical Center Downtown - Room 302',
    reason: 'Follow-up mammogram review',
    status: 'upcoming',
    type: 'Consultation',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    patientName: 'Maria Rodriguez',
    date: '2024-12-02',
    time: '2:30 PM',
    location: 'Imaging Center - Suite 101',
    reason: 'Annual screening',
    status: 'upcoming',
    type: 'Screening',
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Carter',
    patientName: 'Ahmed Ali',
    date: '2024-10-15',
    time: '11:00 AM',
    location: 'Medical Center Downtown - Room 302',
    reason: 'Initial consultation',
    status: 'past',
    type: 'Consultation',
  },
];

export function AppointmentsPage({ userRole, onLogout, onNavigate }: AppointmentsPageProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past' | 'canceled'>('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const filteredAppointments = appointments.filter(apt => 
    filterStatus === 'all' ? true : apt.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'past': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'canceled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking logic
    setShowBookingModal(false);
    setNewAppointment({ doctor: '', date: '', time: '', reason: '' });
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
          <DoctorSidebar onNavigate={onNavigate} activePage="appointments" />
        ) : (
          <PatientSidebar onNavigate={onNavigate} activePage="appointments" />
        )}
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-blue-900 mb-2">Appointments</h1>
                <p className="text-blue-600">Manage your scheduled appointments and consultations</p>
              </div>
              
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-md"
              >
                <Plus size={20} />
                Book New Appointment
              </button>
            </div>

            {/* View Toggle & Filters */}
            <div className="bg-white rounded-xl shadow-md border border-blue-100 p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <List size={18} />
                    List View
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      viewMode === 'calendar'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <CalendarIcon size={18} />
                    Calendar View
                  </button>
                </div>

                {/* Status Filters */}
                <div className="flex gap-2">
                  {['all', 'upcoming', 'past', 'canceled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as typeof filterStatus)}
                      className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                        filterStatus === status
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Appointments List */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {/* Date Badge */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 text-center min-w-[80px]">
                          <p className="text-sm opacity-90">
                            {new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                          </p>
                          <p className="text-2xl">
                            {new Date(apt.date).getDate()}
                          </p>
                        </div>

                        {/* Appointment Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-blue-900 mb-1">
                                {userRole === 'doctor' ? apt.patientName : apt.doctorName}
                              </h3>
                              <p className="text-blue-600">{apt.reason}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(apt.status)} capitalize`}>
                              {apt.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-blue-700">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-blue-500" />
                              <span>{apt.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-blue-500" />
                              <span>{apt.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-blue-500" />
                              <span>{apt.type}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {apt.status === 'upcoming' && (
                            <div className="flex gap-3 mt-4">
                              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                                View Details
                              </button>
                              <button className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 rounded-lg text-sm transition-colors">
                                Reschedule
                              </button>
                              <button className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-600 rounded-lg text-sm transition-colors">
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="bg-white rounded-xl shadow-md border border-blue-100 p-12 text-center">
                    <CalendarIcon className="mx-auto text-blue-300 mb-4" size={48} />
                    <h3 className="text-blue-900 mb-2">No Appointments Found</h3>
                    <p className="text-blue-600 mb-4">
                      {filterStatus === 'all' 
                        ? "You don't have any appointments scheduled yet."
                        : `No ${filterStatus} appointments found.`}
                    </p>
                    <button 
                      onClick={() => setShowBookingModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
                    >
                      <Plus size={20} />
                      Book Your First Appointment
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Calendar View */}
            {viewMode === 'calendar' && (
              <div className="bg-white rounded-xl shadow-md border border-blue-100 p-6">
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto text-blue-300 mb-4" size={64} />
                  <h3 className="text-blue-900 mb-2">Calendar View</h3>
                  <p className="text-blue-600">
                    Interactive calendar view coming soon. For now, please use the list view.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-blue-100 flex items-center justify-between">
              <h2 className="text-blue-900">Book New Appointment</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="p-6 space-y-5">
              <div>
                <label className="block text-sm text-blue-900 mb-2">Select Doctor *</label>
                <select
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a doctor</option>
                  <option value="dr-carter">Dr. Emily Carter - Breast Imaging Specialist</option>
                  <option value="dr-chen">Dr. Michael Chen - Oncology Radiologist</option>
                  <option value="dr-johnson">Dr. Sarah Johnson - General Radiologist</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-blue-900 mb-2">Date *</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm text-blue-900 mb-2">Time *</label>
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-blue-900 mb-2">Reason for Visit *</label>
                <textarea
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Please describe the reason for your appointment..."
                  required
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                  <Check size={18} className="text-blue-600" />
                  Appointment Reminders
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    Email reminder 24 hours before
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                    SMS reminder 2 hours before
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

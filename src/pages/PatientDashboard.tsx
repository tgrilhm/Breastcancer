import { Header } from '../components/Header';
import { PatientSidebar } from '../components/PatientSidebar';
import { HealthTipCarousel } from '../components/HealthTipCarousel';
import { PageType } from '../App';
import { Activity, Calendar, TrendingUp, AlertCircle, Plus, FileText, Clock, CheckCircle, Check } from 'lucide-react';

interface PatientDashboardProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export function PatientDashboard({ onLogout, onNavigate }: PatientDashboardProps) {
  // Mock screening history data
  const screeningHistory = [
    {
      id: 'SCR-2024-001',
      date: '2024-12-01',
      time: '10:30 AM',
      result: 'Benign',
      confidence: '94.2%',
      status: 'Completed'
    },
    {
      id: 'SCR-2024-002',
      date: '2024-11-15',
      time: '02:15 PM',
      result: 'Benign',
      confidence: '91.8%',
      status: 'Completed'
    },
    {
      id: 'SCR-2024-003',
      date: '2024-10-28',
      time: '11:45 AM',
      result: 'Benign',
      confidence: '89.5%',
      status: 'Completed'
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Emily Carter',
      specialty: 'Oncology',
      date: '2024-12-10',
      time: '09:00 AM',
      type: 'Follow-up Consultation'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Roberts',
      specialty: 'Radiology',
      date: '2024-12-15',
      time: '02:30 PM',
      type: 'Screening Review'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header onLogout={onLogout} userName="Sarah Johnson" />

      <div className="flex">
        <PatientSidebar onNavigate={onNavigate} activePage="patient-dashboard" />

        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-gray-800 mb-2">Welcome back, Sarah! 👋</h1>
              <p className="text-gray-600">Here's your breast cancer screening overview</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Screenings */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Activity className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-gray-800 mb-1">Total Screenings</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">12</p>
                <p className="text-sm text-gray-500">3 this year</p>
              </div>

              {/* Last Screening */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Clock className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Recent</span>
                </div>
                <h3 className="text-gray-800 mb-1">Last Screening</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">3 days</p>
                <p className="text-sm text-gray-500">December 1, 2024</p>
              </div>

              {/* Risk Status */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                    <Check className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Low Risk</span>
                </div>
                <h3 className="text-gray-800 mb-1">Current Status</h3>
                <p className="text-3xl font-bold text-emerald-600 mb-2">Benign</p>
                <p className="text-sm text-gray-500">94.2% confidence</p>
              </div>

              {/* Next Appointment */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">Upcoming</span>
                </div>
                <h3 className="text-gray-800 mb-1">Next Appointment</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">Dec 10</p>
                <p className="text-sm text-gray-500">Dr. Emily Carter</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Screening History */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                          <FileText className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="text-gray-800">Recent Screening History</h3>
                          <p className="text-sm text-gray-600">Your latest screening results</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('screening')}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                      >
                        View All
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Screening ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Result</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Confidence</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {screeningHistory.map((screening) => (
                          <tr key={screening.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <span className="font-medium text-blue-600">{screening.id}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-gray-900">{new Date(screening.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                <p className="text-sm text-gray-500">{screening.time}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium ${screening.result === 'Benign'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-700'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${screening.result === 'Benign' ? 'bg-emerald-500' : 'bg-red-500'
                                  }`}></div>
                                {screening.result}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: screening.confidence }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">{screening.confidence}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                                <CheckCircle className="text-emerald-500" size={16} />
                                {screening.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {screeningHistory.length === 0 && (
                    <div className="p-12 text-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <FileText className="text-gray-400" size={32} />
                      </div>
                      <h4 className="text-gray-800 mb-2">No Screening History</h4>
                      <p className="text-gray-500 mb-6">Start your first breast cancer screening today</p>
                      <button
                        onClick={() => onNavigate('screening')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                      >
                        Start Screening
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Health Tips */}
                <div>
                  <HealthTipCarousel />
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-600 flex items-center justify-center">
                        <Calendar className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-gray-800">Upcoming Appointments</h3>
                        <p className="text-sm text-gray-600">{upcomingAppointments.length} scheduled</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                            {new Date(appointment.date).getDate()}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-800 font-semibold mb-1">{appointment.doctor}</h4>
                            <p className="text-sm text-blue-600">{appointment.specialty}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} className="text-blue-500" />
                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} className="text-purple-500" />
                            {appointment.time}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <span className="text-xs font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg">
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => onNavigate('appointments')}
                      className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View All Appointments →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { PatientScreeningPage } from './pages/PatientScreeningPage';

export type UserRole = 'patient' | 'doctor' | null;
export type PageType = 'login' | 'signup' | 'doctor-dashboard' | 'patient-dashboard' | 'appointments' | 'messages' | 'profile' | 'settings' | 'screening';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'doctor') {
      setCurrentPage('doctor-dashboard');
    } else if (role === 'patient') {
      setCurrentPage('patient-dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      case 'doctor-dashboard':
        return <DoctorDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'patient-dashboard':
        return <PatientDashboard onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'appointments':
        return <AppointmentsPage userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesPage userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage userRole={userRole} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'screening':
        return <PatientScreeningPage onLogout={handleLogout} onNavigate={handleNavigate} />;
      default:
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
    }
  };

  return <>{renderPage()}</>;
}

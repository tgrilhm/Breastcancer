import { Header } from '../components/Header';
import { PatientSidebar } from '../components/PatientSidebar';
import { HealthTipCarousel } from '../components/HealthTipCarousel';
import { AnalysisReport } from '../components/AnalysisReport';
import { ActionsSidebar } from '../components/ActionsSidebar';
import { PageType } from '../App';

interface PatientDashboardProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export function PatientDashboard({ onLogout, onNavigate }: PatientDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <Header onLogout={onLogout} userName="Sarah Johnson" />
      
      <div className="flex">
        <PatientSidebar onNavigate={onNavigate} activePage="patient-dashboard" />
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <HealthTipCarousel />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <AnalysisReport />
              </div>
              
              <div className="lg:col-span-1">
                <ActionsSidebar onNavigate={onNavigate} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

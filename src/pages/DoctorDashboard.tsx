import React from 'react';
import { DoctorHeader } from '../components/DoctorHeader';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { StatsCards } from '../components/StatsCards';
import { PatientTable } from '../components/PatientTable';
import { PageType } from '../App';

interface DoctorDashboardProps {
  onLogout: () => void;
  onNavigate: (page: PageType) => void;
}

export function DoctorDashboard({ onLogout, onNavigate }: DoctorDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <DoctorHeader onLogout={onLogout} />
      
      <div className="flex">
        <DoctorSidebar onNavigate={onNavigate} activePage="doctor-dashboard" />
        
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-blue-900 mb-2">Patient Cases Overview</h1>
              <p className="text-blue-600">Review and manage AI-screened patient cases</p>
            </div>
            
            <StatsCards />
            
            <div className="mt-8">
              <PatientTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

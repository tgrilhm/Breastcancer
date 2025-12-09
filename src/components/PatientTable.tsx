import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  patientId: string;
  dateUploaded: string;
  status: 'high-risk' | 'low-risk' | 'pending';
  statusText: string;
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    patientId: '#P-1024',
    dateUploaded: 'Oct 25, 2024',
    status: 'high-risk',
    statusText: 'AI: High Risk (Further Review)',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    patientId: '#P-1025',
    dateUploaded: 'Oct 25, 2024',
    status: 'low-risk',
    statusText: 'AI: Low Risk (Benign Indicator)',
  },
  {
    id: '3',
    name: 'Ahmed Ali',
    patientId: '#P-1026',
    dateUploaded: 'Oct 24, 2024',
    status: 'pending',
    statusText: 'AI Analysis in Progress...',
  },
  {
    id: '4',
    name: 'Jennifer Smith',
    patientId: '#P-1027',
    dateUploaded: 'Oct 24, 2024',
    status: 'high-risk',
    statusText: 'AI: High Risk (Further Review)',
  },
  {
    id: '5',
    name: 'Robert Chen',
    patientId: '#P-1028',
    dateUploaded: 'Oct 23, 2024',
    status: 'low-risk',
    statusText: 'AI: Low Risk (Benign Indicator)',
  },
  {
    id: '6',
    name: 'Emily Davis',
    patientId: '#P-1029',
    dateUploaded: 'Oct 23, 2024',
    status: 'low-risk',
    statusText: 'AI: Low Risk (Benign Indicator)',
  },
];

export function PatientTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  
  const getStatusIcon = (status: Patient['status']) => {
    switch (status) {
      case 'high-risk':
        return <AlertTriangle className="text-orange-500" size={18} />;
      case 'low-risk':
        return <CheckCircle className="text-green-500" size={18} />;
      case 'pending':
        return <Clock className="text-blue-500" size={18} />;
    }
  };
  
  const getStatusStyle = (status: Patient['status']) => {
    switch (status) {
      case 'high-risk':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'low-risk':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };
  
  const getActionButton = (status: Patient['status']) => {
    if (status === 'high-risk') {
      return (
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Eye size={16} />
          Review Case
        </button>
      );
    } else if (status === 'low-risk') {
      return (
        <button className="bg-white hover:bg-blue-50 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <Eye size={16} />
          View Details
        </button>
      );
    } else {
      return (
        <button 
          className="bg-gray-100 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2"
          disabled
        >
          <Eye size={16} />
          View Details
        </button>
      );
    }
  };
  
  // Filter out patients with 'AI Analysis in Progress...'
  const filteredPatients = patients.filter(p => p.statusText !== 'AI Analysis in Progress...');
  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4 border-b border-blue-100">
        <h2 className="text-blue-900">Recent Cases</h2>
        <p className="text-sm text-blue-600 mt-1">Click on a case to view detailed analysis</p>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-blue-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-blue-900">Patient Name</th>
              <th className="px-6 py-4 text-left text-sm text-blue-900">ID</th>
              <th className="px-6 py-4 text-left text-sm text-blue-900">Date Uploaded</th>
              <th className="px-6 py-4 text-left text-sm text-blue-900">AI Screening Status</th>
              <th className="px-6 py-4 text-center text-sm text-blue-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {filteredPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-blue-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-blue-900">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-600">{patient.patientId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-blue-700">{patient.dateUploaded}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusStyle(patient.status)}`}>
                    {getStatusIcon(patient.status)}
                    <span className="text-sm">{patient.statusText}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-center items-center">{getActionButton(patient.status)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-blue-100 flex items-center justify-between">
        <p className="text-sm text-blue-600">
          Showing 5 of 60 total cases
        </p>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 px-4">
            <span className="text-blue-900">{currentPage}</span>
            <span className="text-blue-400">of</span>
            <span className="text-blue-900">{totalPages}</span>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import logoImage from '../assets/logo.png';

interface HeaderProps {
  onLogout: () => void;
  userName?: string;
}

export function Header({ onLogout, userName = 'Sarah Johnson' }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img 
            src={logoImage} 
            alt="MedVision AI Logo" 
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-blue-600">MedVision AI</h1>
            <p className="text-xs text-gray-600">Intelligent Breast Cancer Screening Platform</p>
          </div>
        </div>
        
        {/* User Profile Section */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <Bell className="text-blue-600" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-blue-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white shadow-md">
              <User size={20} />
            </div>
            <div className="hidden sm:block">
              <p className="text-blue-900">{userName}</p>
              <p className="text-xs text-blue-600">Patient ID: #12847</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
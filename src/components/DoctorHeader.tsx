import { LogOut, Bell } from 'lucide-react';

interface DoctorHeaderProps {
  onLogout: () => void;
}

export function DoctorHeader({ onLogout }: DoctorHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            {/* Eye with Pink Ribbon Logo */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Eye */}
              <ellipse cx="50" cy="50" rx="45" ry="25" fill="#3B82F6" opacity="0.2"/>
              <ellipse cx="50" cy="50" rx="35" ry="20" fill="#3B82F6" opacity="0.3"/>
              <circle cx="50" cy="50" r="12" fill="#1E40AF"/>
              <circle cx="52" cy="48" r="4" fill="white"/>
              
              {/* Pink Ribbon Accent */}
              <path d="M 70 35 Q 75 25 80 30 Q 85 35 80 40 Q 75 45 70 50 Q 75 55 80 60 Q 85 65 80 70 Q 75 75 70 65" 
                    fill="none" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="80" cy="30" r="2" fill="#EC4899"/>
              <circle cx="80" cy="70" r="2" fill="#EC4899"/>
            </svg>
          </div>
          <div>
            <h1 className="text-blue-900">MedVision</h1>
            <p className="text-xs text-blue-600">Doctor Portal</p>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <Bell className="text-blue-600" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          
          {/* Doctor Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-blue-100">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
              <img 
                src="https://images.unsplash.com/photo-1632054224477-c9cb3aae1b7e?w=200&h=200&fit=crop" 
                alt="Dr. Emily Carter"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-blue-900">Dr. Emily Carter</p>
              <p className="text-xs text-blue-600">Breast Imaging Specialist</p>
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

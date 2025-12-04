import { LayoutDashboard, Calendar, MessageSquare, User, Settings, Scan } from 'lucide-react';
import { PageType } from '../App';

interface PatientSidebarProps {
  onNavigate: (page: PageType) => void;
  activePage: PageType;
}

const menuItems = [
  { id: 'patient-dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'screening' as PageType, label: 'New Screening', icon: Scan, highlight: true },
  { id: 'appointments' as PageType, label: 'Appointments', icon: Calendar },
  { id: 'messages' as PageType, label: 'Messages', icon: MessageSquare, badge: 2 },
  { id: 'profile' as PageType, label: 'My Profile', icon: User },
  { id: 'settings' as PageType, label: 'Settings', icon: Settings },
];

export function PatientSidebar({ onNavigate, activePage }: PatientSidebarProps) {
  return (
    <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-white border-r border-blue-100 shadow-sm">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.highlight && !isActive
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md hover:from-pink-600 hover:to-pink-700'
                      : isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      isActive || item.highlight
                        ? 'bg-white/20 text-white' 
                        : 'bg-pink-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Emergency Contact */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100">
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-5 text-white shadow-md">
          <h4 className="mb-2">Need Immediate Help?</h4>
          <p className="text-sm text-pink-100 mb-3">
            Our support team is available 24/7
          </p>
          <button className="w-full bg-white hover:bg-pink-50 text-pink-600 py-2 px-4 rounded-lg transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
}

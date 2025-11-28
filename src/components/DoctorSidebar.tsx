import { LayoutDashboard, Users, Calendar, MessageSquare, User, Settings } from 'lucide-react';
import { PageType } from '../App';

interface DoctorSidebarProps {
  onNavigate: (page: PageType) => void;
  activePage: PageType;
}

const menuItems = [
  { id: 'doctor-dashboard' as PageType, label: 'Patient Cases', icon: LayoutDashboard },
  { id: 'appointments' as PageType, label: 'Appointments', icon: Calendar },
  { id: 'messages' as PageType, label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'profile' as PageType, label: 'My Profile', icon: User },
  { id: 'settings' as PageType, label: 'Settings', icon: Settings },
];

export function DoctorSidebar({ onNavigate, activePage }: DoctorSidebarProps) {
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
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      isActive 
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
      
      {/* Quick Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100">
        <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-4">
          <p className="text-sm text-blue-900 mb-2">Need Help?</p>
          <p className="text-xs text-blue-600 mb-3">
            Contact technical support or view documentation
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </aside>
  );
}

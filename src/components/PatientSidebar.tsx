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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.highlight && !isActive
                    ? 'bg-pink-500 text-white shadow-md hover:bg-pink-600'
                    : isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-700 hover:bg-blue-50'
                    }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${isActive || item.highlight
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


    </aside>
  );
}

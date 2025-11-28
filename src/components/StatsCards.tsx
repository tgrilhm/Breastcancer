import { Clock, Upload, Users } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Pending Reviews',
    value: '12',
    icon: Clock,
    color: 'from-orange-400 to-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    id: 2,
    title: 'New Uploads Today',
    value: '5',
    icon: Upload,
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: 3,
    title: 'Total Patients',
    value: '145',
    icon: Users,
    color: 'from-pink-400 to-pink-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-blue-600 text-sm mb-2">{stat.title}</p>
                <p className="text-blue-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
            
            <div className={`mt-4 pt-4 border-t border-blue-100 flex items-center gap-2 text-sm ${stat.textColor}`}>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              <span>Updated just now</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

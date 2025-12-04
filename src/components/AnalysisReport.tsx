import { FileText, Activity, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analysisData = [
  { time: '0s', value: 20 },
  { time: '2s', value: 45 },
  { time: '4s', value: 35 },
  { time: '6s', value: 60 },
  { time: '8s', value: 55 },
  { time: '10s', value: 75 },
  { time: '12s', value: 70 },
  { time: '14s', value: 85 },
];

export function AnalysisReport() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-blue-900 flex items-center gap-2">
          <Activity className="text-blue-600" size={24} />
          Analysis Report
        </h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
          <Clock size={14} />
          In Progress
        </span>
      </div>
      
      {/* Status Section */}
      <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
            <FileText className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-blue-900 mb-2">
              Status: Mammogram Uploaded. AI Analysis in Progress...
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <FileText size={16} />
              <span>scan_results.pdf</span>
              <span className="text-blue-500">• 2.4 MB</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-blue-700 mb-2">
            <span>Analysis Progress</span>
            <span>73%</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Visualization Section */}
      <div className="mb-4">
        <h3 className="text-blue-900 mb-4">AI Processing Activity</h3>
        <div className="bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl p-4">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={analysisData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E7FF" />
              <XAxis 
                dataKey="time" 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#6B7280"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #DBEAFE',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Info Footer */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">
          i
        </div>
        <p className="text-sm text-blue-800">
          Your results will be reviewed by our AI system and a certified radiologist. 
          You'll receive a notification once the analysis is complete, typically within 24-48 hours.
        </p>
      </div>
    </div>
  );
}

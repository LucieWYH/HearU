
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts';
import { WEEKLY_STATS, THREAT_TYPES, RISK_TREND_DATA } from '../constants';
import { TrendingUp, Users } from 'lucide-react';

const StatsView: React.FC = () => {
  return (
    <div className="p-6 pt-12 space-y-6 animate-fadeIn pb-24">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Threat Analysis</h2>
        <p className="text-sm text-gray-500">Family & Personal Safety Report</p>
      </div>

      {/* F5: Risk Trend Analysis (New Feature) */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-orange-500" />
            <h3 className="text-sm font-bold text-gray-900">Family Risk Trend</h3>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RISK_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} dy={10} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316'}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">Risk index decreased by 15% after installation.</p>
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold mb-4 ml-2">Weekly Attempts</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_STATS}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} dy={10} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                {WEEKLY_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 4 ? '#ef4444' : '#cbd5e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Threat Types Pie */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <h3 className="text-sm font-semibold mb-2 ml-2">Threat Types</h3>
        <div className="flex items-center">
            <div className="h-32 w-1/2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie data={THREAT_TYPES} innerRadius={30} outerRadius={45} paddingAngle={5} dataKey="value">
                    {THREAT_TYPES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : index === 1 ? '#000000' : '#cbd5e1'} />
                    ))}
                </Pie>
                </PieChart>
            </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2">
                {THREAT_TYPES.map((type, index) => (
                    <div key={type.name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: index === 0 ? '#f97316' : index === 1 ? '#000000' : '#cbd5e1'}}></div>
                        <span className="text-xs text-gray-600 font-medium">{type.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{type.value}%</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;

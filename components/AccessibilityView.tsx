
import React from 'react';
import { ShieldCheck, Phone, AlertTriangle, Bell, User, Calendar, Sun, Moon } from 'lucide-react';
import { Screen } from '../types';

interface AccessibilityProps {
  onNavigate: (screen: Screen, params?: any) => void;
}

const AccessibilityView: React.FC<AccessibilityProps> = ({ onNavigate }) => {
  const date = new Date();
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-full bg-slate-50 flex flex-col p-6 pt-20 animate-fadeIn relative font-sans overflow-y-auto pb-24">
      
      {/* 1. Header: Date & Greeting */}
      <div className="mb-6">
        <p className="text-gray-500 text-xl font-medium mb-1">{dateStr}</p>
        <h1 className="text-4xl font-bold text-gray-900">Good Morning</h1>
      </div>

      {/* 2. Main Status Card */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border-2 border-green-100 mb-6 flex items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-green-50 rounded-full -mr-10 -mt-10 z-0"></div>
        
        <div className="bg-green-100 p-4 rounded-full text-green-600 z-10 relative">
            <ShieldCheck size={48} strokeWidth={2.5} />
        </div>
        <div className="z-10 relative">
            <h2 className="text-2xl font-bold text-gray-900">You are Safe</h2>
            <p className="text-gray-500 font-medium">No threats today</p>
        </div>
      </div>

      {/* 3. Quick Call Family (The most important feature) */}
      <div className="mb-8">
         <h3 className="text-lg font-bold text-gray-400 mb-3 uppercase tracking-wider">Quick Call</h3>
         <button 
           onClick={() => onNavigate(Screen.SENIOR_CALLING, { name: 'Emma (Daughter)' })}
           className="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-gray-200 flex items-center gap-5 active:scale-95 transition-transform"
         >
             <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-md">
                 <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" alt="Daughter" className="w-full h-full object-cover" />
             </div>
             <div className="text-left flex-1">
                 <h3 className="text-2xl font-bold text-gray-900">Emma</h3>
                 <p className="text-orange-500 font-bold flex items-center gap-1">
                     <Phone size={16} fill="currentColor" /> Call Daughter
                 </p>
             </div>
         </button>
      </div>

      {/* 4. Large Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
            onClick={() => onNavigate(Screen.SENIOR_CONTACTS)} 
            className="bg-blue-100 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform"
        >
            <Phone size={40} className="text-blue-600" />
            <span className="text-lg font-bold text-blue-900">Phone</span>
        </button>
        
        <button 
            onClick={() => onNavigate(Screen.SENIOR_ALERTS)}
            className="bg-orange-100 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform relative"
        >
            <div className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
            <Bell size={40} className="text-orange-600" />
            <span className="text-lg font-bold text-orange-900">Alerts</span>
        </button>
      </div>

      {/* 5. Simple Recent History */}
      <div>
         <h3 className="text-lg font-bold text-gray-400 mb-3 uppercase tracking-wider">Recent Activity</h3>
         <div className="bg-white rounded-[2rem] p-6 border border-gray-100 space-y-6">
             <div className="flex items-center gap-4 opacity-50">
                 <div className="bg-red-100 p-3 rounded-full text-red-500">
                     <AlertTriangle size={24} />
                 </div>
                 <div>
                     <p className="font-bold text-gray-900 text-lg">Spam Blocked</p>
                     <p className="text-gray-500">Yesterday, 14:00</p>
                 </div>
             </div>
             <div className="w-full h-px bg-gray-100"></div>
             <div className="flex items-center gap-4">
                 <div className="bg-green-100 p-3 rounded-full text-green-500">
                     <ShieldCheck size={24} />
                 </div>
                 <div>
                     <p className="font-bold text-gray-900 text-lg">System Scan</p>
                     <p className="text-gray-500">Today, 09:00</p>
                 </div>
             </div>
         </div>
      </div>

    </div>
  );
};

export default AccessibilityView;


import React, { useState } from 'react';
import { ToggleRight, ToggleLeft, LogOut, FileText, Activity, Users, Waves, Lock, Accessibility, UserCog, Info, Smartphone } from 'lucide-react';
import { Screen, UserRole } from '../types';

interface SettingsProps {
    onNavigate?: (screen: Screen) => void;
    userRole?: UserRole;
    setUserRole?: (role: UserRole) => void;
}

const SettingsView: React.FC<SettingsProps> = ({ onNavigate, userRole, setUserRole }) => {
  const [settings, setSettings] = useState({
    autoBlock: true,
    callProtection: true,
    smsFiltering: true,
    emotionDetection: true,
    hapticAlerts: true,
    familySharing: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 pt-16 animate-fadeIn pb-24 font-sans">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Settings</h2>

      {/* ROLE SWITCHER CARD */}
      {setUserRole && userRole && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full -mr-8 -mt-8 z-0"></div>
              
              <div className="relative z-10 mb-4">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <UserCog size={16} className="text-gray-500"/>
                      App Interface Mode
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Select the interface best suited for this device's user.</p>
              </div>

              <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1 relative z-10 overflow-x-auto">
                  <button 
                    onClick={() => setUserRole(UserRole.GUARDIAN)}
                    className={`flex-1 min-w-[80px] py-4 px-2 rounded-xl text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                        userRole === UserRole.GUARDIAN 
                        ? 'bg-gray-900 text-white shadow-lg scale-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                      <UserCog size={20} />
                      Guardian
                  </button>
                  <button 
                    onClick={() => setUserRole(UserRole.ACTIVE_SENIOR)}
                    className={`flex-1 min-w-[80px] py-4 px-2 rounded-xl text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                        userRole === UserRole.ACTIVE_SENIOR 
                        ? 'bg-blue-600 text-white shadow-lg scale-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                      <Smartphone size={20} />
                      Active
                  </button>
                  <button 
                    onClick={() => setUserRole(UserRole.SENIOR)}
                    className={`flex-1 min-w-[80px] py-4 px-2 rounded-xl text-[10px] font-bold flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                        userRole === UserRole.SENIOR 
                        ? 'bg-orange-500 text-white shadow-lg scale-100' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                      <Accessibility size={20} />
                      Senior
                  </button>
              </div>

              {/* Dynamic Contextual Help */}
              <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100 flex gap-3 items-start transition-all">
                  <Info size={16} className={`flex-shrink-0 mt-0.5 ${
                      userRole === UserRole.GUARDIAN ? 'text-gray-900' : 
                      userRole === UserRole.ACTIVE_SENIOR ? 'text-blue-600' : 'text-orange-500'
                  }`} />
                  <div>
                      <p className="text-xs font-bold text-gray-900">
                          {userRole === UserRole.GUARDIAN ? 'Guardian Mode' : 
                           userRole === UserRole.ACTIVE_SENIOR ? 'Active Senior Mode' : 'Simplified Senior Mode'}
                      </p>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
                          {userRole === UserRole.GUARDIAN 
                              ? "Full dashboard for family members monitoring a senior's safety remotely."
                              : userRole === UserRole.ACTIVE_SENIOR 
                              ? "Full feature set for tech-savvy seniors who want to manage their own protection."
                              : "Simplified, high-contrast interface with large buttons. Best for less tech-savvy seniors."
                          }
                      </p>
                  </div>
              </div>
          </div>
      )}

      <div className="space-y-6">
        {/* Protection Group */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Core Protection</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ToggleItem 
                label="Real-time Call Analysis" 
                isOn={settings.callProtection}
                onToggle={() => toggle('callProtection')}
                icon={<Lock size={18} />}
            />
            <ToggleItem 
                label="SMS Filtering" 
                isOn={settings.smsFiltering}
                onToggle={() => toggle('smsFiltering')}
                icon={<FileText size={18} />}
                last
            />
          </div>
        </section>

        {/* hearU Features */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">hearU Technology</h3>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <ToggleItem 
                label="Emotion Detection" 
                isOn={settings.emotionDetection}
                onToggle={() => toggle('emotionDetection')}
                icon={<Activity size={18} />}
            />
            <ToggleItem 
                label="Haptic Warnings" 
                isOn={settings.hapticAlerts}
                onToggle={() => toggle('hapticAlerts')}
                icon={<Waves size={18} />}
                last
            />
           </div>
        </section>

        {/* Family */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Family Circle</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ToggleItem 
                label="Share Status with Family" 
                isOn={settings.familySharing}
                onToggle={() => toggle('familySharing')}
                icon={<Users size={18} />}
                last
            />
          </div>
        </section>

        <button className="w-full py-4 text-red-500 font-bold flex items-center justify-center gap-2 mt-4 bg-white rounded-2xl shadow-sm border border-red-100 mb-8 active:scale-95 transition-transform">
            <LogOut size={18} />
            Sign Out
        </button>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ 
  label: string; 
  isOn: boolean; 
  onToggle: () => void;
  icon: React.ReactNode;
  last?: boolean;
}> = ({ label, isOn, onToggle, icon, last }) => (
  <div className={`p-4 flex items-center justify-between ${!last ? 'border-b border-gray-50' : ''}`}>
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <span className="font-medium text-gray-700 text-sm">{label}</span>
    </div>
    <button onClick={onToggle} className={`transition-colors ${isOn ? 'text-green-500' : 'text-gray-300'}`}>
        {isOn ? <ToggleRight size={32} fill="currentColor" className="text-green-500" /> : <ToggleLeft size={32} />}
    </button>
  </div>
);

export default SettingsView;

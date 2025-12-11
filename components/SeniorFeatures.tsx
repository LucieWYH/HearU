
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, PhoneOff, User, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Screen } from '../types';

// --- 1. SENIOR CONTACTS LIST ---
export const SeniorContacts: React.FC<{ onNavigate: (screen: Screen, params?: any) => void; onBack: () => void }> = ({ onNavigate, onBack }) => {
  const contacts = [
    { name: 'Emma (Daughter)', color: 'bg-green-100', iconColor: 'text-green-600', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
    { name: 'Dr. Smith', color: 'bg-blue-100', iconColor: 'text-blue-600', icon: <User size={32} /> },
    { name: 'Emergency (SOS)', color: 'bg-red-100', iconColor: 'text-red-600', icon: <AlertTriangle size={32} /> },
  ];

  return (
    <div className="h-full bg-slate-50 flex flex-col pt-20 p-6 animate-fadeIn font-sans">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
          <ArrowLeft size={32} className="text-gray-900" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Phonebook</h1>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <button 
            key={contact.name}
            onClick={() => onNavigate(Screen.SENIOR_CALLING, { name: contact.name })}
            className="w-full bg-white p-4 rounded-[2rem] shadow-sm border border-gray-200 flex items-center gap-5 active:scale-95 transition-transform"
          >
            <div className={`w-20 h-20 ${contact.color} rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-sm`}>
               {contact.img ? (
                   <img src={contact.img} alt={contact.name} className="w-full h-full object-cover" />
               ) : (
                   <div className={contact.iconColor}>{contact.icon}</div>
               )}
            </div>
            <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                <p className="text-gray-500 font-medium text-lg">Tap to call</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 2. SENIOR CALLING SCREEN ---
export const SeniorCalling: React.FC<{ name: string; onBack: () => void }> = ({ name, onBack }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col items-center justify-center pt-20 pb-20 p-6 animate-fadeIn relative">
       <div className="text-center mb-12">
          <h2 className="text-gray-400 text-xl font-medium uppercase tracking-widest mb-4">Calling...</h2>
          <h1 className="text-white text-4xl font-bold">{name}</h1>
          <p className="text-gray-300 text-2xl font-mono mt-4">{formatTime(duration)}</p>
       </div>

       <div className="w-48 h-48 bg-gray-800 rounded-full flex items-center justify-center mb-16 relative">
          <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
          <User size={96} className="text-gray-400" />
       </div>

       <button 
         onClick={onBack}
         className="w-full bg-red-600 text-white rounded-[2rem] py-8 flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-transform"
       >
         <div className="bg-red-800 p-3 rounded-full">
            <PhoneOff size={40} />
         </div>
         <span className="text-3xl font-bold">End Call</span>
       </button>
    </div>
  );
};

// --- 3. SENIOR ALERTS HISTORY ---
export const SeniorAlerts: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const alerts = [
        { title: 'Spam Call Blocked', time: 'Yesterday', detail: 'Fake Bank' },
        { title: 'Safe Scan', time: 'Today', detail: 'System OK', safe: true },
        { title: 'SMS Deleted', time: '2 days ago', detail: 'Phishing Link' },
    ];

    return (
        <div className="h-full bg-slate-50 flex flex-col pt-20 p-6 animate-fadeIn font-sans">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
                <ArrowLeft size={32} className="text-gray-900" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Safety Alerts</h1>
            </div>

            <div className="space-y-4">
                {alerts.map((alert, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 flex items-center gap-4">
                         <div className={`w-16 h-16 rounded-full flex items-center justify-center ${alert.safe ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                             {alert.safe ? <User size={32}/> : <ShieldAlert size={32}/>}
                         </div>
                         <div>
                             <h3 className="text-xl font-bold text-gray-900">{alert.title}</h3>
                             <p className="text-gray-500 text-lg">{alert.time} • {alert.detail}</p>
                         </div>
                    </div>
                ))}
            </div>
             
            <div className="mt-auto bg-green-50 p-6 rounded-[2rem] border border-green-200 text-center">
                <h3 className="text-green-800 font-bold text-xl">You are Protected</h3>
                <p className="text-green-600 mt-2">Orange Gardien is running in background.</p>
            </div>
        </div>
    );
};

import React from 'react';
import { ArrowLeft, ShieldAlert, ThumbsUp, ThumbsDown, MapPin, Clock } from 'lucide-react';
import { Alert, RiskLevel } from '../types';

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
}

const AlertDetail: React.FC<AlertDetailProps> = ({ alert, onBack }) => {
  return (
    <div className="bg-white min-h-full flex flex-col animate-fadeIn">
      {/* Detail Header */}
      <div className={`p-6 pb-12 ${
        alert.riskLevel === RiskLevel.HIGH ? 'bg-red-500' : 
        alert.riskLevel === RiskLevel.MEDIUM ? 'bg-orange-500' : 'bg-green-500'
      } text-white rounded-b-[2rem] shadow-lg`}>
        <button onClick={onBack} className="bg-white/20 p-2 rounded-full mb-6 hover:bg-white/30 transition-colors">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
               <ShieldAlert size={14} />
               <span className="text-xs font-bold uppercase">{alert.riskLevel} Risk</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">{alert.description}</h1>
            <p className="opacity-90 font-mono text-sm">{alert.source}</p>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-8">
        {/* Main Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Threat Analysis</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {alert.details}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase">Time</span>
                </div>
                <span className="text-sm font-medium">{alert.timestamp}</span>
             </div>
             <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase">Origin</span>
                </div>
                <span className="text-sm font-medium">Paris, FR</span>
             </div>
          </div>
        </div>

        {/* Action / Advice */}
        <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3">Recommendation</h3>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
                <p className="text-orange-800 font-medium text-sm">{alert.advice}</p>
            </div>
        </div>

        {/* Feedback Loop */}
        <div className="text-center">
            <p className="text-xs text-gray-400 mb-4">Was this detection accurate?</p>
            <div className="flex justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-sm font-bold text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors">
                    <ThumbsUp size={18} />
                    Yes
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-sm font-bold text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors">
                    <ThumbsDown size={18} />
                    No
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
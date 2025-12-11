
import React, { useState } from 'react';
import { Shield, Bell, ChevronRight, AlertTriangle, Smartphone, Users, CheckCircle, Search, Info, BookOpen, Eye, UserCheck } from 'lucide-react';
import { Alert, RiskLevel, Screen, UserRole } from '../types';
import { MOCK_ALERTS } from '../constants';
import Logo from './Logo';

interface DashboardProps {
  onAlertClick: (alert: Alert) => void;
  onNavigate?: (screen: Screen) => void;
  userRole?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ onAlertClick, onNavigate, userRole }) => {
  const [verifyNum, setVerifyNum] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<'idle' | 'safe' | 'risk' | 'unknown' | 'spam'>('idle');

  const handleVerify = () => {
      if(!verifyNum) return;
      setIsVerifying(true);
      setVerifyResult('idle');
      setTimeout(() => {
          setIsVerifying(false);
          const num = verifyNum.replace(/\s/g, ''); 
          if (['3900', '3639', '1014', '3976', '6677'].includes(num)) {
              setVerifyResult('safe');
          } 
          else if (num.includes('9988') || num.includes('099') || num.length > 10) {
              setVerifyResult('risk');
          }
          else if (num.startsWith('09') || num.startsWith('042')) {
              setVerifyResult('spam');
          }
          else {
              setVerifyResult('unknown');
          }
      }, 1200);
  };

  const isGuardian = userRole === UserRole.GUARDIAN;

  return (
    <div className="flex flex-col min-h-full pb-24 font-sans">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 pt-16 pb-16 rounded-b-[2.5rem] shadow-xl relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 right-0 p-32 bg-orange-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
        
        {/* Role Badge */}
        <div className={`absolute top-14 right-8 flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md ${isGuardian ? 'bg-white/10 border-white/10' : 'bg-blue-500/20 border-blue-400/30'}`}>
            {isGuardian ? <Eye size={12} className="text-orange-400" /> : <UserCheck size={12} className="text-blue-300" />}
            <span className={`text-[10px] font-bold tracking-wide uppercase ${isGuardian ? 'text-orange-100' : 'text-blue-100'}`}>
                {isGuardian ? 'Guardian View' : 'Active Mode'}
            </span>
        </div>

        <div className="flex justify-between items-center mb-6 relative z-10 mt-2">
          <Logo variant="light" size="sm" />
          <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Bell size={20} />
          </button>
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-1">
              {isGuardian ? 'Status Overview' : 'My Security'}
          </p>
          <h1 className="text-3xl font-bold mb-1">
              {isGuardian ? 'Monitoring' : 'My Protection'}
          </h1>
          <p className="text-lg text-gray-300 font-light flex items-center gap-2">
            {isGuardian ? "Mom's Device" : "System Active"} <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          </p>
        </div>
      </div>

      {/* Stats Card Overlay */}
      <div className="mx-6 -mt-10 bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 relative z-20">
        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner relative">
                    <Shield size={24} className="absolute" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Device Status</p>
                    <p className="font-bold text-green-600">Active & Protected</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-400">Blocked</p>
            </div>
        </div>
        
        {/* Device/Family Status Row */}
        <div className="flex items-center justify-between pt-1">
             <div className="flex items-center gap-3">
                 <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                     <Smartphone size={16} />
                 </div>
                 <span className="text-sm font-bold text-gray-700">Samsung Galaxy S22</span>
             </div>
             <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold text-green-700">Online</span>
             </div>
        </div>
      </div>

      {/* F4: AI Quick Verify */}
      <div className="px-6 mt-6">
          <div className="flex justify-between items-end mb-2">
            <h3 className="font-bold text-sm text-gray-800">AI Number Verification</h3>
            <p className="text-[10px] text-gray-400">Try: 3900 (Safe) or 0699... (Risk)</p>
          </div>
          <div className="bg-gray-100 p-2 rounded-2xl flex items-center gap-2 pr-2 shadow-inner transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-500/20">
             <div className="pl-3 text-gray-400"><Search size={18}/></div>
             <input 
                value={verifyNum}
                onChange={(e) => setVerifyNum(e.target.value)}
                placeholder="Enter number to verify..." 
                className="bg-transparent flex-1 text-sm outline-none text-gray-800 placeholder:text-gray-400"
             />
             <button 
                onClick={handleVerify}
                disabled={isVerifying || !verifyNum}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all ${
                    isVerifying ? 'bg-gray-400' : 'bg-black active:scale-95'
                }`}
             >
                 {isVerifying ? 'Scanning...' : 'Verify'}
             </button>
          </div>
          
          {/* Results Display */}
          {verifyResult === 'risk' && (
              <div className="mt-2 bg-red-100 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn border border-red-200">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold block">HIGH RISK DETECTED</span>
                    <span>Blacklisted in Anti-Scam Database.</span>
                  </div>
              </div>
          )}
          {verifyResult === 'spam' && (
              <div className="mt-2 bg-orange-100 text-orange-700 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn border border-orange-200">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold block">POTENTIAL SPAM</span>
                    <span>Likely cold calling or telemarketing.</span>
                  </div>
              </div>
          )}
          {verifyResult === 'safe' && (
              <div className="mt-2 bg-green-100 text-green-700 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn border border-green-200">
                  <CheckCircle size={16} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold block">OFFICIAL NUMBER</span>
                    <span>Verified (e.g., Bank/Post/Gov).</span>
                  </div>
              </div>
          )}
          {verifyResult === 'unknown' && (
              <div className="mt-2 bg-gray-100 text-gray-600 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn border border-gray-200">
                  <Info size={16} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold block">LOW RISK / UNKNOWN</span>
                    <span>No negative reports found.</span>
                  </div>
              </div>
          )}
      </div>

      {/* Feature Grid: Simulation & Knowledge Base */}
      {onNavigate && (
        <div className="px-6 mt-6 grid grid-cols-2 gap-4">
            <div 
                onClick={() => onNavigate(Screen.SIMULATION)}
                className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-2xl shadow-lg flex flex-col justify-between cursor-pointer active:scale-95 transition-transform group min-h-[110px]"
            >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-orange-500 mb-2">
                    <Smartphone size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm leading-tight">Live<br/>Simulation</h3>
                    <div className="mt-2 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit group-hover:bg-orange-400 transition-colors">
                        START
                    </div>
                </div>
            </div>

            <div 
                onClick={() => onNavigate(Screen.SCAM_DB)}
                className="bg-gradient-to-br from-purple-700 to-purple-900 p-4 rounded-2xl shadow-lg flex flex-col justify-between cursor-pointer active:scale-95 transition-transform group min-h-[110px]"
            >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-purple-200 mb-2">
                    <BookOpen size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm leading-tight">Knowledge<br/>Base</h3>
                    <div className="mt-2 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit group-hover:bg-white/30 transition-colors">
                        BROWSE
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Recent Activity List */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-lg text-gray-800">Alert History</h3>
          <button className="text-xs text-orange-600 font-semibold">View All</button>
        </div>
        
        <div className="space-y-4">
          {MOCK_ALERTS.map((alert) => (
            <div 
              key={alert.id} 
              onClick={() => onAlertClick(alert)}
              className="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  alert.riskLevel === RiskLevel.HIGH ? 'bg-red-100 text-red-600' :
                  alert.riskLevel === RiskLevel.MEDIUM ? 'bg-orange-100 text-orange-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 text-sm">{alert.source}</h4>
                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{alert.description}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 self-center transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

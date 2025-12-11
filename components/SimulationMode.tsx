
import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, User, ArrowLeft, Send, Grid, MessageSquare, ShieldCheck, Lock, Activity, Waves, BrainCircuit, Globe, X, ExternalLink, Database, AlertTriangle } from 'lucide-react';
import { Screen } from '../types';
import Logo from './Logo';

interface SimulationProps {
  onBack: () => void;
  onNavigate?: (screen: Screen, params?: any) => void;
  autoPlay?: boolean;
}

type SimScreen = 'LAUNCHER' | 'PHONE' | 'MESSAGES' | 'SANDBOX';

const SimulationMode: React.FC<SimulationProps> = ({ onBack, onNavigate, autoPlay }) => {
  const [currentScreen, setCurrentScreen] = useState<SimScreen>('LAUNCHER');
  
  // === PHONE STATE ===
  const [callStatus, setCallStatus] = useState<'RINGING' | 'CONNECTED' | 'ENDED' | 'IDLE'>('IDLE');
  const [recordingActive, setRecordingActive] = useState(false);

  // === SMS STATE ===
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'me' | 'scam', link?: boolean}>>([
    { id: 1, text: "Colissimo: Your package FR-8822 is pending delivery.", sender: 'scam' },
    { id: 2, text: "Please confirm your address immediately to avoid return fees.", sender: 'scam' },
    { id: 3, text: "Click here: http://bit.ly/track-colis-fr", sender: 'scam', link: true }
  ]);
  
  // === SANDBOX STATE (F1) ===
  const [sandboxProgress, setSandboxProgress] = useState(0);
  const [sandboxThreatFound, setSandboxThreatFound] = useState(false);

  // Auto-trigger ringing when entering Phone app
  useEffect(() => {
    if (currentScreen === 'PHONE') {
      const timer = setTimeout(() => setCallStatus('RINGING'), 800);
      return () => clearTimeout(timer);
    } else {
      setCallStatus('IDLE');
      setRecordingActive(false);
    }
  }, [currentScreen]);

  // Simulate Sandbox Scanning
  useEffect(() => {
    if (currentScreen === 'SANDBOX') {
        setSandboxProgress(0);
        setSandboxThreatFound(false);
        const interval = setInterval(() => {
            setSandboxProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSandboxThreatFound(true);
                    return 100;
                }
                return prev + 2; // 2% per tick
            });
        }, 30);
        return () => clearInterval(interval);
    }
  }, [currentScreen]);

  // Demo Automation Logic
  useEffect(() => {
      if (autoPlay && currentScreen === 'LAUNCHER') {
          setTimeout(() => setCurrentScreen('PHONE'), 1000);
      }
      if (autoPlay && currentScreen === 'PHONE' && callStatus === 'RINGING') {
          setTimeout(handleCallAccept, 2000);
      }
      if (autoPlay && callStatus === 'CONNECTED') {
          setTimeout(() => setCallStatus('ENDED'), 4000);
      }
      if (autoPlay && callStatus === 'ENDED') {
          setTimeout(() => {
            if (onNavigate) onNavigate(Screen.SCAM_DB, { query: 'Fake Bank Advisor' });
          }, 2000);
      }
  }, [autoPlay, currentScreen, callStatus]);

  const handleLinkClick = () => {
    setCurrentScreen('SANDBOX');
  };

  const handleHomeButton = () => {
    setCurrentScreen('LAUNCHER');
  };

  const handleCallAccept = () => {
      setCallStatus('CONNECTED');
      // Activate recording immediately for visual feedback
      setRecordingActive(true);
  };

  return (
    <div className="h-full bg-black text-white flex flex-col relative overflow-hidden font-sans">
      
      {/* STATUS BAR REMOVED: Handled by Layout.tsx globally */}

      {/* === 1. LAUNCHER (Home Screen) === */}
      {currentScreen === 'LAUNCHER' && (
        <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1621609764095-6414a4d2b83d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center flex flex-col p-6 pt-16 animate-fadeIn">
          
          {/* App Grid */}
          <div className="grid grid-cols-4 gap-y-8 gap-x-4">
            
            <AppIcon icon={<div className="bg-gray-400 w-full h-full rounded-[14px]"></div>} label="Mail" />
            <AppIcon icon={<div className="bg-white w-full h-full rounded-[14px] flex items-center justify-center"><span className="text-black font-bold text-xs">Cal</span></div>} label="Calendar" />
            <AppIcon icon={<div className="bg-gray-800 w-full h-full rounded-[14px]"></div>} label="Photos" />
            <AppIcon icon={<div className="bg-gray-400 w-full h-full rounded-[14px]"></div>} label="Camera" />
            
            {/* Interactive Apps */}
            <AppIcon 
              onClick={onBack} 
              icon={
                <div className="bg-gradient-to-br from-gray-900 to-black w-full h-full rounded-[14px] flex items-center justify-center border border-orange-500/30 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 bg-orange-500 rounded-full blur-[20px] opacity-40"></div>
                   <div className="z-10 text-white">
                      <Logo variant="light" size="sm" showText={false} />
                   </div>
                </div>
              } 
              label="Gardien" 
              notification
            />

            <AppIcon icon={<div className="bg-blue-400 w-full h-full rounded-[14px]"></div>} label="Weather" />
            <AppIcon icon={<div className="bg-gray-600 w-full h-full rounded-[14px]"></div>} label="Settings" />
            {/* F4: AI Verify Mock App */}
            <AppIcon icon={<div className="bg-purple-600 w-full h-full rounded-[14px] flex items-center justify-center"><BrainCircuit size={24} className="text-white"/></div>} label="AI Verify" />
          </div>

          {/* Dock */}
          <div className="mt-auto bg-white/20 backdrop-blur-xl rounded-[2rem] p-4 flex justify-around items-center mb-4">
            <button onClick={() => setCurrentScreen('PHONE')} className="w-14 h-14 bg-green-500 rounded-[14px] flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <Phone size={28} fill="currentColor" className="text-white" />
            </button>
            <div className="w-14 h-14 bg-blue-500 rounded-[14px] flex items-center justify-center shadow-lg opacity-50">
               <div className="w-8 h-8 border-2 border-white rounded-full"></div>
            </div>
            <button onClick={() => setCurrentScreen('MESSAGES')} className="w-14 h-14 bg-green-500 rounded-[14px] flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <MessageSquare size={28} fill="currentColor" className="text-white" />
            </button>
            <div className="w-14 h-14 bg-red-400 rounded-[14px] flex items-center justify-center shadow-lg opacity-50">
               <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* === 2. PHONE APP (F2, F3, F6, F8) === */}
      {currentScreen === 'PHONE' && (
        <div className="h-full bg-gray-900 flex flex-col pt-12 relative animate-fadeIn">
          
          <button onClick={handleHomeButton} className="absolute top-12 left-6 z-50 p-2 bg-gray-800 rounded-full">
            <Grid size={20} className="text-gray-400" />
          </button>

          {/* F8: Big Text Mode Warning */}
          {(callStatus === 'RINGING' || callStatus === 'CONNECTED') && (
            <div className="absolute top-24 left-4 right-4 bg-red-600 p-6 rounded-3xl border-4 border-red-400 shadow-[0_0_50px_rgba(220,38,38,0.5)] z-20 flex flex-col items-center text-center">
               <ShieldCheck size={48} className="text-white mb-2" />
               <h3 className="font-black text-white text-2xl uppercase tracking-wider mb-1">FRAUD ALERT</h3>
               <p className="text-white text-lg font-bold">Suspected Bank Scam</p>
               {/* F3: Haptic Visual */}
               {callStatus === 'RINGING' && (
                   <div className="mt-4 flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                       <Waves size={16} className="text-white animate-pulse" />
                       <span className="text-xs font-mono uppercase">Haptic: High Intensity</span>
                   </div>
               )}
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center pt-20">
             <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
                <User size={48} className="text-gray-400" />
                {callStatus === 'RINGING' && (
                  <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-ping opacity-50"></div>
                )}
             </div>
             
             <h2 className="text-3xl font-light mb-2">+33 1 02 03 04 05</h2>
             
             {/* F2: Recording & AI Agent Status - Visual Indicator */}
             {callStatus === 'CONNECTED' && (
                 <div className="flex flex-col items-center gap-2 mt-2">
                     <p className="text-white text-xl font-mono">00:14</p>
                     <div className="flex items-center gap-2 bg-red-900/50 px-3 py-1 rounded-full border border-red-500/30">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs text-red-200 font-bold uppercase tracking-wider">Rec & AI Agent Active</span>
                     </div>
                 </div>
             )}
             
             {callStatus === 'RINGING' && <p className="text-gray-400 text-lg animate-pulse">Incoming Potential Spam...</p>}
             {callStatus === 'ENDED' && <p className="text-gray-400 text-lg">Call Ended</p>}
          </div>

          <div className="w-full px-12 pb-24 grid grid-cols-2 gap-8 mt-auto">
            {callStatus === 'RINGING' ? (
              <>
                <button onClick={() => setCallStatus('ENDED')} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all">
                    <PhoneOff size={32} />
                  </div>
                  <span className="text-sm font-bold">DECLINE</span>
                </button>
                <button onClick={handleCallAccept} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all animate-bounce">
                    <Phone size={32} />
                  </div>
                  <span className="text-sm font-bold">ACCEPT</span>
                </button>
              </>
            ) : callStatus === 'CONNECTED' ? (
              <button onClick={() => setCallStatus('ENDED')} className="col-span-2 flex flex-col items-center gap-2 mx-auto">
                 <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl border-4 border-red-800 active:scale-95 transition-all">
                    <PhoneOff size={40} />
                 </div>
                 <span className="text-sm font-bold">END CALL</span>
              </button>
            ) : (
              <div className="col-span-2 flex flex-col items-center gap-4">
                 {/* F6: Emotion Detection Report */}
                 <div className="bg-gray-800 p-6 rounded-2xl w-full text-center border border-gray-700">
                    <div className="flex justify-center mb-3">
                        <Activity className="text-orange-500 animate-pulse" size={32} />
                    </div>
                    <h4 className="text-orange-400 font-bold uppercase text-xs tracking-widest mb-1">Emotion Analysis</h4>
                    <p className="text-xl text-white font-bold mb-1">High Stress Detected</p>
                    <p className="text-xs text-gray-400 mb-4">Voice tremors detected. Heart rate likely elevated.</p>
                    
                    <div className="bg-orange-500/20 rounded-lg p-3 mb-4">
                        <p className="text-orange-300 text-xs font-mono">⚠ Family Alert Sent</p>
                    </div>

                    <button onClick={onBack} className="w-full bg-white text-black py-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                        OPEN REPORT
                    </button>
                 </div>
                 <button onClick={() => setCallStatus('RINGING')} className="text-gray-500 text-sm underline">Reset Sim</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === 3. MESSAGES APP === */}
      {currentScreen === 'MESSAGES' && (
        <div className="h-full bg-white flex flex-col pt-12 animate-fadeIn text-gray-900 relative">
           {/* Header - Adjusted pt to clear status bar */}
           <div className="bg-gray-50 p-4 border-b flex items-center gap-3 shadow-sm z-10">
              <button onClick={handleHomeButton} className="mr-2 text-blue-500">
                <ArrowLeft size={24} />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                UNK
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">+33 6 99 88 77 66</h3>
              </div>
            </div>

            {/* Message List */}
            <div className="flex-1 p-4 space-y-4 bg-white overflow-y-auto pb-48 flex flex-col">
              {/* Force flex column layout to avoid overlap issues */}
              <div className="relative w-full z-20 mb-4">
                  {/* Persistent Fraud Overlay */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl shadow-sm p-4">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-800 text-sm">hearU Protection</h4>
                            <p className="text-xs text-orange-700 leading-tight mt-1">
                                Suspicious link detected. Pattern matches known "Delivery Scam".
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 rounded-lg p-2 mb-3 flex justify-between items-center px-3 border border-orange-100">
                        <div className="flex items-center gap-2">
                            <Database size={12} className="text-gray-500"/>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Database Match</span>
                        </div>
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">98% Match</span>
                    </div>

                    <button 
                        onClick={() => onNavigate && onNavigate(Screen.SCAM_DB, { query: 'Colissimo' })}
                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <ExternalLink size={14}/> View Full Report in App
                    </button>
                  </div>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'me' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.link ? (
                      <div>
                        Click here: <span onClick={handleLinkClick} className="text-blue-600 underline cursor-pointer hover:text-blue-200">http://bit.ly/track-colis-fr</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-gray-50 flex items-center gap-2 mb-6 absolute bottom-0 left-0 right-0 z-30">
                <div className="bg-gray-200 rounded-full p-2 text-gray-500"><Grid size={16}/></div>
                <input disabled placeholder="Text Message" className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm" />
                <button className="p-2 bg-blue-500 rounded-full text-white"><Send size={16}/></button>
            </div>
        </div>
      )}

      {/* === 4. SANDBOX BROWSER (F1) === */}
      {currentScreen === 'SANDBOX' && (
        <div className="h-full bg-gray-100 flex flex-col pt-12 animate-fadeIn text-gray-900 relative z-50">
           {/* Fake Browser URL Bar */}
           <div className="bg-white p-2 border-b flex items-center gap-2 shadow-sm px-4">
              <button onClick={() => setCurrentScreen('MESSAGES')} className="text-gray-500"><X size={20}/></button>
              <div className={`flex-1 bg-gray-100 rounded-lg p-2 text-xs flex items-center gap-2 ${sandboxThreatFound ? 'text-red-600 bg-red-50' : 'text-gray-500'}`}>
                 {sandboxThreatFound ? <Lock size={12} className="text-red-500"/> : <Globe size={12}/>}
                 <span className="truncate">http://bit.ly/track-colis-fr</span>
              </div>
           </div>

           {/* Web Content Area */}
           <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {!sandboxThreatFound ? (
                  <div className="space-y-4">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <h2 className="text-xl font-bold">hearU Sandbox</h2>
                      <p className="text-gray-500 text-sm">Scanning link in isolated environment...</p>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
                          <div className="bg-blue-500 h-full transition-all duration-100" style={{width: `${sandboxProgress}%`}}></div>
                      </div>
                  </div>
              ) : (
                  <div className="bg-white p-6 rounded-2xl shadow-xl border-t-8 border-red-500 w-full animate-bounce-short">
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-red-600 mb-2">Phishing Site</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        This site attempts to steal banking credentials. <br/>
                        <strong>Pattern Match:</strong> "Fake La Poste"
                      </p>
                      
                      {/* F1: Real Case Match */}
                      <div className="bg-gray-50 p-3 rounded-lg text-left mb-6 border border-gray-200">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Database Match</span>
                          <p className="text-xs font-semibold text-gray-700 mt-1">"Colissimo Delivery Fee Scam"</p>
                          <p className="text-[10px] text-gray-500">Reported 12,403 times this week.</p>
                      </div>

                      <button onClick={() => onNavigate && onNavigate(Screen.SCAM_DB, { query: 'Colissimo' })} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg mb-3">
                        Close & View in Database
                      </button>
                      <button onClick={() => setCurrentScreen('MESSAGES')} className="w-full text-gray-500 text-xs py-2 underline">
                        Return to Simulation
                      </button>
                  </div>
              )}
           </div>
        </div>
      )}

      {/* iPhone Home Bar */}
      <div className="absolute bottom-1 left-0 right-0 h-1 flex justify-center z-50">
        <div onClick={handleHomeButton} className="w-32 h-1 bg-gray-300/50 rounded-full cursor-pointer hover:bg-white transition-colors"></div>
      </div>
    </div>
  );
};

const AppIcon: React.FC<{icon: React.ReactNode, label: string, onClick?: () => void, notification?: boolean}> = ({icon, label, onClick, notification}) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 active:scale-95 transition-transform w-full">
    <div className="w-[60px] h-[60px] relative shadow-md rounded-[14px]">
        {icon}
        {notification && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">1</span>
            </div>
        )}
    </div>
    <span className="text-[11px] font-medium text-white drop-shadow-md">{label}</span>
  </button>
);

export default SimulationMode;

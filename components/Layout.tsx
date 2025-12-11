
import React from 'react';
import { Home, BarChart2, Settings, Smartphone, Signal, Wifi, Battery, PhoneCall, Phone } from 'lucide-react';
import { Screen, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen, params?: any) => void;
  showNav: boolean;
  statusBarTheme?: 'light' | 'dark';
  userRole?: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, showNav, statusBarTheme = 'dark', userRole = UserRole.GUARDIAN }) => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center font-sans">
      {/* Mobile Device Container */}
      <div className="w-full max-w-[400px] h-[100dvh] md:h-[850px] bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col border-4 border-gray-900/10 md:border-gray-900">
        
        {/* Modern Overlay Status Bar */}
        <div className={`absolute top-0 left-0 right-0 h-12 flex justify-between items-end pb-2 px-6 text-xs font-medium select-none z-50 pointer-events-none backdrop-blur-[0px] ${statusBarTheme === 'light' ? 'text-white' : 'text-gray-900'}`}>
          <span className="ml-1">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={14} fill="currentColor" />
            <Wifi size={14} />
            <Battery size={18} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-slate-50">
          {children}
        </div>

        {/* Bottom Navigation */}
        {showNav && (
          <div className={`bg-white border-t border-gray-100 flex justify-around items-center px-2 pb-4 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-40 ${userRole === UserRole.SENIOR ? 'h-24' : 'h-20'}`}>
            
            {(userRole === UserRole.GUARDIAN || userRole === UserRole.ACTIVE_SENIOR) ? (
                // STANDARD NAV (4 TABS) - For Guardian & Active Senior
                <>
                    <NavButton 
                      icon={<Home size={24} />} 
                      label="Home" 
                      isActive={activeScreen === Screen.HOME} 
                      onClick={() => onNavigate(Screen.HOME)} 
                    />
                    <NavButton 
                      icon={<BarChart2 size={24} />} 
                      label="Stats" 
                      isActive={activeScreen === Screen.STATS} 
                      onClick={() => onNavigate(Screen.STATS)} 
                    />
                    <NavButton 
                      icon={<Smartphone size={24} />} 
                      label="hearU" 
                      isActive={activeScreen === Screen.SIMULATION} 
                      onClick={() => onNavigate(Screen.SIMULATION)} 
                      highlight
                    />
                    <NavButton 
                      icon={<Settings size={24} />} 
                      label="Settings" 
                      isActive={activeScreen === Screen.SETTINGS} 
                      onClick={() => onNavigate(Screen.SETTINGS)} 
                    />
                </>
            ) : (
                // SENIOR NAV (SIMPLIFIED & LARGER)
                <>
                    <NavButton 
                      icon={<Home size={32} />} 
                      label="Home" 
                      isActive={activeScreen === Screen.HOME} 
                      onClick={() => onNavigate(Screen.HOME)} 
                      large
                    />
                     <NavButton 
                      icon={<Phone size={32} />} 
                      label="Call" 
                      isActive={activeScreen === Screen.SENIOR_CONTACTS || activeScreen === Screen.SENIOR_CALLING} 
                      onClick={() => onNavigate(Screen.SENIOR_CONTACTS)} 
                      large
                    />
                    <NavButton 
                      icon={<Settings size={32} />} 
                      label="Menu" 
                      isActive={activeScreen === Screen.SETTINGS} 
                      onClick={() => onNavigate(Screen.SETTINGS)} 
                      large
                    />
                </>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

const NavButton: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  highlight?: boolean;
  large?: boolean;
}> = ({ icon, label, isActive, onClick, highlight, large }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center ${large ? 'w-24' : 'w-16'} h-full transition-all duration-200 
      ${isActive ? 'text-orange-500 scale-105' : 'text-gray-400 hover:text-gray-600'}
      ${highlight && !isActive ? 'text-orange-400' : ''}
    `}
  >
    <div className={`${highlight ? 'bg-orange-50 p-1 rounded-full mb-0.5' : 'mb-1'}`}>
      {icon}
    </div>
    <span className={`${large ? 'text-sm' : 'text-[10px]'} font-bold`}>{label}</span>
  </button>
);

export default Layout;


import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import StatsView from './components/StatsView';
import SettingsView from './components/SettingsView';
import SimulationMode from './components/SimulationMode';
import AlertDetail from './components/AlertDetail';
import AccessibilityView from './components/AccessibilityView';
import ScamDatabaseView from './components/ScamDatabaseView';
import { SeniorCalling, SeniorContacts, SeniorAlerts } from './components/SeniorFeatures';
import { Screen, Alert, UserRole } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.ONBOARDING);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUARDIAN);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [navParams, setNavParams] = useState<any>({});

  // Load state from local storage to persist Onboarding status if needed
  useEffect(() => {
    const isComplete = localStorage.getItem('onboarding_complete');
    if (isComplete === 'true') {
      setActiveScreen(Screen.HOME);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setActiveScreen(Screen.HOME);
  };

  const handleNavigate = (screen: Screen, params?: any) => {
      setActiveScreen(screen);
      if (params) {
          setNavParams(params);
      } else {
          setNavParams({});
      }
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setActiveScreen(Screen.ALERT_DETAIL);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case Screen.HOME:
        // Role-based Home Screen Logic
        if (userRole === UserRole.SENIOR) {
            return <AccessibilityView onNavigate={handleNavigate} />;
        }
        // Both Guardian and Active Senior use the Dashboard
        return <Dashboard onAlertClick={handleAlertClick} onNavigate={handleNavigate} userRole={userRole} />;

      case Screen.STATS:
        return <StatsView />;
      case Screen.SETTINGS:
        return <SettingsView onNavigate={handleNavigate} userRole={userRole} setUserRole={setUserRole} />;
      case Screen.SIMULATION:
        return <SimulationMode onBack={() => setActiveScreen(Screen.HOME)} onNavigate={handleNavigate} />;
      case Screen.ALERT_DETAIL:
        return selectedAlert ? (
          <AlertDetail alert={selectedAlert} onBack={() => setActiveScreen(Screen.HOME)} />
        ) : (
          <Dashboard onAlertClick={handleAlertClick} onNavigate={handleNavigate} userRole={userRole} />
        );
      case Screen.ACCESSIBILITY:
        return <AccessibilityView onNavigate={handleNavigate} />;
      case Screen.SCAM_DB:
        return <ScamDatabaseView onBack={() => setActiveScreen(Screen.HOME)} initialQuery={navParams?.query} />;
      
      // NEW SENIOR SCREENS
      case Screen.SENIOR_CONTACTS:
        return <SeniorContacts onNavigate={handleNavigate} onBack={() => setActiveScreen(Screen.HOME)} />;
      case Screen.SENIOR_CALLING:
        return <SeniorCalling name={navParams?.name || 'Unknown'} onBack={() => setActiveScreen(Screen.SENIOR_CONTACTS)} />;
      case Screen.SENIOR_ALERTS:
        return <SeniorAlerts onBack={() => setActiveScreen(Screen.HOME)} />;
        
      default:
        return <Dashboard onAlertClick={handleAlertClick} onNavigate={handleNavigate} userRole={userRole} />;
    }
  };

  // Determine if we should show the bottom nav
  const showNav = activeScreen !== Screen.ONBOARDING && 
                  activeScreen !== Screen.SIMULATION && 
                  activeScreen !== Screen.ALERT_DETAIL &&
                  activeScreen !== Screen.SCAM_DB &&
                  activeScreen !== Screen.SENIOR_CALLING && // Hide nav during call
                  activeScreen !== Screen.SENIOR_CONTACTS &&
                  activeScreen !== Screen.SENIOR_ALERTS;
  
  // Logic to switch Status Bar text color (Light for dark backgrounds, Dark for light backgrounds)
  const getStatusBarTheme = () => {
      // Dashboard has dark header for both Guardian and Active Senior
      if (activeScreen === Screen.HOME && (userRole === UserRole.GUARDIAN || userRole === UserRole.ACTIVE_SENIOR)) return 'light'; 
      if (activeScreen === Screen.SIMULATION) return 'light'; 
      if (activeScreen === Screen.SCAM_DB) return 'light'; 
      if (activeScreen === Screen.ALERT_DETAIL) return 'light'; 
      if (activeScreen === Screen.SENIOR_CALLING) return 'light';
      return 'dark'; 
  };

  return (
    <Layout 
        activeScreen={activeScreen} 
        onNavigate={handleNavigate} 
        showNav={showNav} 
        statusBarTheme={getStatusBarTheme()}
        userRole={userRole}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;

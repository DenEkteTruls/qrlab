import { createContext, useContext } from 'react';

// Define the available sections
export type DashboardSection = 'dashboard' | 'qr-codes' | 'bulk-upload' | 'analytics' | 'team' | 'settings';

// Create a context for section management
interface DashboardContextType {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}; 
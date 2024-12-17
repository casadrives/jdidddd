import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { DriversManagement } from './DriversManagement';
import { RidesManagement } from './RidesManagement';
import { Settings } from './Settings';
import { SupportDashboard } from './support/SupportDashboard';
import { FinanceDashboard } from './finance/FinanceDashboard';
import { ClientsPanel } from './ClientsPanel';
import { CompanyPanel } from './CompanyPanel';
import { DispatchConsole } from '../dispatch/DispatchConsole';
import { useAuth } from '../../context/AuthContext';
import { Navigation } from '../Navigation';

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const { user, logout } = useAuth();
  const [suspendedCompanies, setSuspendedCompanies] = useState<any[]>([]);

  const handleBackToHome = () => {
    if (window.confirm('Are you sure you want to log out and return to home?')) {
      logout();
      window.location.href = '/';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <AdminOverview suspendedCompanies={suspendedCompanies} />;
      case 'clients':
        return <ClientsPanel />;
      case 'drivers':
        return <DriversManagement />;
      case 'rides':
        return <RidesManagement />;
      case 'finance':
        return <FinanceDashboard />;
      case 'companies':
        return <CompanyPanel />;
      case 'support':
        return <SupportDashboard />;
      case 'settings':
        return <Settings />;
      case 'dispatch':
        return <DispatchConsole />;
      default:
        return <AdminOverview suspendedCompanies={suspendedCompanies} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onBackToHome={handleBackToHome} />
      <AdminHeader user={user} onLogout={handleBackToHome} />
      <div className="flex">
        <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
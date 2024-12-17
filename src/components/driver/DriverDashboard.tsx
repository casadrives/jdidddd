import React, { useState, useEffect } from 'react';
import { DriverHeader } from './DriverHeader';
import { DriverSidebar } from './DriverSidebar';
import { RideRequests } from './RideRequests';
import { DriverEarnings } from './DriverEarnings';
import { DriverChat } from './DriverChat';
import { DriverSettings } from './DriverSettings';
import { LeaveRequestModal } from './LeaveRequestModal';
import { Navigation } from '../Navigation';
import { useAuth } from '../../context/AuthContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { LocationPermissionRequest } from '../LocationPermissionRequest';
import { LocationIndicator } from '../LocationIndicator';
import { DriverStats } from './DriverStats';
import { DriverSchedule } from './DriverSchedule';
import { DriverDocuments } from './DriverDocuments';
import { DriverVehicle } from './DriverVehicle';
import { DriverMap } from './DriverMap';

export function DriverDashboard() {
  const [currentView, setCurrentView] = useState('rides');
  const [isOnline, setIsOnline] = useState(false);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const { user, logout } = useAuth();
  const { location, error, isLoading } = useGeolocation();

  // Update driver location when it changes
  useEffect(() => {
    if (location && isOnline) {
      // In production, make API call to update driver location
      console.log('Updating driver location:', location);
    }
  }, [location, isOnline]);

  const handleBackToHome = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'rides':
        return (
          <div className="space-y-6">
            <DriverStats />
            <RideRequests isOnline={isOnline} />
            <DriverMap location={location} />
          </div>
        );
      case 'earnings':
        return <DriverEarnings />;
      case 'schedule':
        return <DriverSchedule />;
      case 'documents':
        return <DriverDocuments />;
      case 'vehicle':
        return <DriverVehicle />;
      case 'chat':
        return <DriverChat />;
      case 'settings':
        return <DriverSettings onRequestLeave={() => setShowLeaveRequest(true)} />;
      default:
        return <RideRequests isOnline={isOnline} />;
    }
  };

  if (!location && !error) {
    return (
      <LocationPermissionRequest 
        onRequestPermission={() => {
          navigator.geolocation.getCurrentPosition(() => {});
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onBackToHome={handleBackToHome} />
      
      <DriverHeader 
        user={user} 
        isOnline={isOnline} 
        onToggleOnline={setIsOnline}
      />
      
      <div className="flex">
        <DriverSidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
        />
        
        <main className="flex-1 p-6">
          <LocationIndicator 
            isLoading={isLoading}
            error={error}
            location={location}
          />
          {renderView()}
        </main>
      </div>

      <LeaveRequestModal
        isOpen={showLeaveRequest}
        onClose={() => setShowLeaveRequest(false)}
        onSubmit={async (data) => {
          console.log('Submitting leave request:', data);
          setShowLeaveRequest(false);
        }}
      />
    </div>
  );
}
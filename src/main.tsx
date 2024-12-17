import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import AppComponent from './App';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { initializeMapbox } from './config/mapbox';
import './index.css';

// Initialize app
const initializeApp = async () => {
  try {
    // Initialize Mapbox first
    const isMapboxValid = await initializeMapbox();
    if (!isMapboxValid) {
      console.error('Mapbox initialization failed');
    }

    // Only initialize Capacitor plugins if running in native app context
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isNative = userAgent.includes('capacitor');

    if (isNative) {
      await StatusBar.setStyle({ style: 'dark' });
      await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
      
      await SplashScreen.hide({
        fadeOutDuration: 500
      });

      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        }
      });
    }
  } catch (error) {
    console.error('App initialization error:', error);
  }
};

// Initialize app and render
initializeApp().finally(() => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <AuthProvider>
          <AppProvider>
            <AppComponent />
          </AppProvider>
        </AuthProvider>
      </StrictMode>
    );
  }
});
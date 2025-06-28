import Provider from '@/app/provider'; // or wherever your UserDetailContext.Provider is defined
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './_components/AppSidebar';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

function DashboardProvider({ children }) {
  return (
    <Provider> {/* ✅ Wrap with your context provider */}
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full p-10">
          <WelcomeContainer />
          {children}
        </div>
      </SidebarProvider>
    </Provider>
  );
}

export default DashboardProvider;

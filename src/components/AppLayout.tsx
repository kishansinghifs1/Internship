import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import TopNavigation from '@/components/layout/TopNavigation';
import Sidebar from '@/components/layout/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ProjectList from '@/components/projects/ProjectList';
import CreateProject from '@/components/projects/CreateProject';
import MarketplaceView from '@/components/marketplace/MarketplaceView';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import SiteUpdate from '@/components/site/SiteUpdate';
import SiteVerification from '@/components/site/SiteVerification';
import UserManagement from '@/components/users/UserManagement';
import CompanyProfile from '@/components/company/CompanyProfile';
import AccountSettings from '@/components/settings/AccountSettings';
import MyProfile from '@/components/profile/MyProfile';
import Integrations from '@/components/integrations/Integrations';
import UploadDocuments from '@/components/documents/UploadDocuments';
import Services from '@/pages/Services';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import PaymentGateway from '@/pages/PaymentGateway';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (isMobile) {
      toggleSidebar();
    }
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardOverview onNavigate={handleNavigate} />;
      case '/projects':
        return <ProjectList onNavigate={handleNavigate} />;
      case '/create-project':
        return <CreateProject onNavigate={handleNavigate} />;
      case '/marketplace':
        return <MarketplaceView onNavigate={handleNavigate} />;
      case '/analytics':
        return <AnalyticsDashboard onNavigate={handleNavigate} />;
      case '/site-update':
        return <SiteUpdate onNavigate={handleNavigate} />;
      case '/site-verification':
        return <SiteVerification onNavigate={handleNavigate} />;
      case '/user-management':
        return <UserManagement onNavigate={handleNavigate} />;
      case '/company-profile':
        return <CompanyProfile onNavigate={handleNavigate} />;
      case '/account-settings':
        return <AccountSettings />;
      case '/my-profile':
        return <MyProfile />;
      case '/integrations':
        return <Integrations />;
      case '/upload-documents':
        return <UploadDocuments />;
      case '/services':
        return <Services onNavigate={handleNavigate} />;
      case '/about':
        return <AboutUs onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactUs onNavigate={handleNavigate} />;
      case '/payment':
        return <PaymentGateway onNavigate={handleNavigate} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development</p>
              <Button 
                onClick={() => handleNavigate('/dashboard')} 
                className="mt-4"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onNavigate={handleNavigate} />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={toggleSidebar}
          currentPath={currentPath}
          onNavigate={handleNavigate}
        />
        
        <div className="flex-1 overflow-hidden">
          {isMobile && (
            <div className="bg-white border-b border-gray-200 p-4 md:hidden">
              <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}
          
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
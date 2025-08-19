import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3, 
  Camera, 
  Eye, 
  Users, 
  Building2, 
  Settings, 
  Plus, 
  Upload,
  X,
  User,
  Plug,
  Info,
  Phone,
  CreditCard,
  Wrench
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPath, onNavigate }) => {
  const menuItems = [
    {
      section: 'Main',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FolderOpen, label: 'Projects', path: '/projects' },
        { icon: Store, label: 'Marketplace', path: '/marketplace' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
      ]
    },
    {
      section: 'Site Management',
      items: [
        { icon: Camera, label: 'Add Site Update', path: '/site-update' },
        { icon: Eye, label: 'Site Verification', path: '/site-verification' },
      ]
    },
    {
      section: 'Management',
      items: [
        { icon: Users, label: 'User Management', path: '/user-management' },
        { icon: Building2, label: 'Company Profile', path: '/company-profile' },
      ]
    },
    {
      section: 'Settings & Profile',
      items: [
        { icon: User, label: 'My Profile', path: '/my-profile' },
        { icon: Settings, label: 'Account Settings', path: '/account-settings' },
        { icon: Plug, label: 'Integrations', path: '/integrations' },
      ]
    },
    {
      section: 'Quick Actions',
      items: [
        { icon: Plus, label: 'Create Project', path: '/create-project' },
        { icon: Upload, label: 'Upload Documents', path: '/upload-documents' },
      ]
    },
    {
      section: 'Company Info',
      items: [
        { icon: Wrench, label: 'Services', path: '/services' },
        { icon: Info, label: 'About Us', path: '/about' },
        { icon: Phone, label: 'Contact Us', path: '/contact' },
        { icon: CreditCard, label: 'Payment Gateway', path: '/payment' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 space-y-6 overflow-y-auto h-full">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.section}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start text-left",
                        isActive && "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      )}
                      onClick={() => onNavigate(item.path)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
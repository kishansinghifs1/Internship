import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Building, Users, Settings, Upload, Save } from 'lucide-react';

interface CompanyProfileProps {
  onNavigate: (path: string) => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState({
    name: 'BuildBridge Construction',
    industry: 'Construction & Engineering',
    address: 'Mumbai, Maharashtra, India',
    phone: '+91 98765 43210',
    email: 'info@buildbridge.com',
    website: 'www.buildbridge.com',
    description: 'Leading construction company specializing in residential and commercial projects.',
    teamSize: 150,
    foundedYear: 2015
  });

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Company profile has been updated successfully."
    });
  };

  const handleUploadMedia = () => {
    toast({
      title: "Media Upload",
      description: "Office pictures and media uploaded successfully."
    });
  };

  const handleSettings = () => {
    onNavigate('/settings');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadMedia}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </Button>
          <Button variant="outline" onClick={handleSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyData.industry}
                    onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{companyData.teamSize}</div>
                <div className="text-sm text-blue-700">Total Team Members</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Managers</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Engineers</span>
                  <Badge variant="secondary">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technicians</span>
                  <Badge variant="secondary">78</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Support Staff</span>
                  <Badge variant="secondary">15</Badge>
                </div>
              </div>
              
              <Button className="w-full" variant="outline" onClick={() => onNavigate('/users')}>
                Manage Team
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Company Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Founded</span>
                <span className="font-medium">{companyData.foundedYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Projects</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed Projects</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Client Satisfaction</span>
                <span className="font-medium">98%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
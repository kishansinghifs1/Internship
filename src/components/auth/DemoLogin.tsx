import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Store, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DemoLoginProps {
  onLogin: (userType: string, email: string) => void;
  onBack: () => void;
}

const DemoLogin: React.FC<DemoLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      type: 'construction-firm',
      icon: Building2,
      title: 'Construction Firm',
      email: 'demo@constructionfirm.com',
      password: 'demo123',
      description: 'Access project management, budgeting, and site verification tools'
    },
    {
      type: 'vendor',
      icon: Store,
      title: 'Vendor/Supplier',
      email: 'demo@vendor.com',
      password: 'demo123',
      description: 'Manage marketplace listings, RFQs, and client communications'
    },
    {
      type: 'client',
      icon: User,
      title: 'Client/Owner',
      email: 'demo@client.com',
      password: 'demo123',
      description: 'Track project progress, budgets, and communicate with teams'
    }
  ];

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    setUserType(account.type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !userType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields or select a demo account.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful!",
        description: `Welcome to BuildBridge AI dashboard as ${userType.replace('-', ' ')}.`,
      });
      onLogin(userType, email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 lg:top-8 lg:left-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Landing
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BuildBridge AI</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Login</h1>
          <p className="text-gray-600">Choose a demo account or enter your credentials</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Accounts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Try Demo Accounts</h2>
            <div className="space-y-4">
              {demoAccounts.map((account, index) => {
                const Icon = account.icon;
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      userType === account.type ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleDemoLogin(account)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{account.title}</CardTitle>
                            <Badge variant="secondary" className="mt-1">
                              {account.email}
                            </Badge>
                          </div>
                        </div>
                        {userType === account.type && (
                          <Badge className="bg-blue-600">Selected</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{account.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Login to Dashboard</CardTitle>
                <CardDescription>
                  Enter your credentials or select a demo account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Select value={userType} onValueChange={setUserType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction-firm">Construction Firm</SelectItem>
                        <SelectItem value="vendor">Vendor/Supplier</SelectItem>
                        <SelectItem value="client">Client/Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                  </Button>
                </form>
                
                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Demo credentials: demo123 for all accounts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLogin;
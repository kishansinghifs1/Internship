import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Database, Calendar, CreditCard, Building, Key, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Tally ERP',
      type: 'ERP',
      status: 'connected',
      description: 'Sync project financials and vendor contracts',
      icon: <Database className="h-5 w-5" />,
      features: ['Project Financials', 'Vendor Contracts', 'Cost Codes']
    },
    {
      id: '2',
      name: 'Autodesk Revit',
      type: 'BIM',
      status: 'disconnected',
      description: 'Upload and view BIM models in site verification',
      icon: <Building className="h-5 w-5" />,
      features: ['BIM Models', 'Site Comparison', 'Model Viewing']
    },
    {
      id: '3',
      name: 'Razorpay',
      type: 'Payment',
      status: 'connected',
      description: 'Handle payments and vendor payouts',
      icon: <CreditCard className="h-5 w-5" />,
      features: ['Payment Processing', 'Vendor Payouts', 'Invoice Export']
    },
    {
      id: '4',
      name: 'Google Calendar',
      type: 'Calendar',
      status: 'disconnected',
      description: 'Sync project deadlines and milestones',
      icon: <Calendar className="h-5 w-5" />,
      features: ['Deadline Sync', 'Milestone Tracking', 'Reminders']
    }
  ]);
  
  const [apiTokens, setApiTokens] = useState([
    { id: '1', name: 'Mobile App API', scope: 'Read/Write', created: '2024-01-15', lastUsed: '2024-01-20' },
    { id: '2', name: 'Analytics Dashboard', scope: 'Read Only', created: '2024-01-10', lastUsed: '2024-01-19' }
  ]);
  
  const { toast } = useToast();

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId ? { ...int, status: 'connected' } : int
    ));
    toast({ title: 'Integration connected successfully!' });
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId ? { ...int, status: 'disconnected' } : int
    ));
    toast({ title: 'Integration disconnected' });
  };

  const generateApiToken = () => {
    const newToken = {
      id: Date.now().toString(),
      name: 'New API Token',
      scope: 'Read Only',
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiTokens(prev => [...prev, newToken]);
    toast({ title: 'API token generated successfully!' });
  };

  const revokeToken = (tokenId: string) => {
    setApiTokens(prev => prev.filter(token => token.id !== tokenId));
    toast({ title: 'API token revoked' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-muted-foreground">Connect BuildBridge AI with your existing tools and systems.</p>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api-tokens">API Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {integrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {integration.icon}
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">{integration.description}</div>
                      <div className="flex gap-1 mt-1">
                        {integration.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => handleDisconnect(integration.id)}>
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <>
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />
                          Disconnected
                        </Badge>
                        <Button size="sm" onClick={() => handleConnect(integration.id)}>
                          Connect
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="api-tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Tokens
              </CardTitle>
              <CardDescription>
                Generate and manage API tokens for custom integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Active Tokens</h4>
                  <p className="text-sm text-muted-foreground">Manage your API access tokens</p>
                </div>
                <Button onClick={generateApiToken}>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Token
                </Button>
              </div>
              
              <div className="space-y-3">
                {apiTokens.map((token) => (
                  <div key={token.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{token.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Scope: {token.scope} • Created: {token.created} • Last used: {token.lastUsed}
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Revoke
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke API Token</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently revoke the API token. Applications using this token will lose access.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => revokeToken(token.id)}>
                            Revoke Token
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Eye, AlertTriangle, CheckCircle, Clock, ArrowLeft, Plus } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface SiteVerificationProps {
  onNavigate: (path: string) => void;
}

const SiteVerification: React.FC<SiteVerificationProps> = ({ onNavigate }) => {
  const { projects } = useAppContext();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');

  const handleAddNew = () => {
    onNavigate('/site-update');
  };

  const handleUpdate = () => {
    toast({ title: "Updated", description: "Site verification data has been updated." });
  };

  const handleViewDetails = (id: number) => {
    toast({ title: "View Details", description: `Viewing details for verification ${id}` });
  };

  const handleCreateTask = (anomaly: string) => {
    toast({ title: "Task Created", description: `Task created for: ${anomaly}` });
  };

  const verificationResults = [
    {
      id: 1,
      timestamp: '2024-11-15 14:30',
      phase: 'Foundation',
      status: 'completed',
      progress: 95,
      anomalies: [],
      aiConfidence: 92
    },
    {
      id: 2,
      timestamp: '2024-11-15 10:15',
      phase: 'Structure',
      status: 'in-progress',
      progress: 78,
      anomalies: ['Material placement deviation', 'Safety equipment missing'],
      aiConfidence: 87
    },
    {
      id: 3,
      timestamp: '2024-11-14 16:45',
      phase: 'Finishing',
      status: 'delayed',
      progress: 45,
      anomalies: ['Quality issue detected', 'Timeline deviation'],
      aiConfidence: 94
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'delayed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => onNavigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Site Verification</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.length > 0 ? (
              projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-projects" disabled>
                No projects available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        
        <Select value={selectedPhase} onValueChange={setSelectedPhase}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="foundation">Foundation</SelectItem>
            <SelectItem value="structure">Structure</SelectItem>
            <SelectItem value="finishing">Finishing</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
        
        <Button variant="outline" onClick={handleUpdate}>
          Update
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(result.status)}>
                              {getStatusIcon(result.status)}
                              {result.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{result.timestamp}</span>
                          </div>
                          <Badge variant="outline">{result.phase}</Badge>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm">{result.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${result.progress}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        {result.anomalies.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-red-600 mb-1">Anomalies Detected:</p>
                            <div className="space-y-1">
                              {result.anomalies.map((anomaly, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <AlertTriangle className="h-3 w-3 text-red-500" />
                                  <span className="text-sm text-red-700">{anomaly}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            AI Confidence: {result.aiConfidence}%
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(result.id)}>
                              View Details
                            </Button>
                            {result.anomalies.length > 0 && (
                              <Button size="sm" variant="destructive" onClick={() => handleCreateTask(result.anomalies[0])}>
                                Create Task
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">89%</div>
                  <div className="text-sm text-blue-700">Overall Progress</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Images Processed</span>
                    <Badge variant="secondary">247</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anomalies Found</span>
                    <Badge variant="destructive">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks Created</span>
                    <Badge variant="default">8</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Recent Insights</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-yellow-50 rounded text-yellow-800">
                      Material delivery delay detected
                    </div>
                    <div className="p-2 bg-green-50 rounded text-green-800">
                      Quality standards maintained
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-blue-800">
                      Schedule on track for completion
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteVerification;
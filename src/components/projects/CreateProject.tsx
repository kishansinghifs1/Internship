import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

interface CreateProjectProps {
  onNavigate: (path: string) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { addProject } = useAppContext();
  const [projectData, setProjectData] = useState({
    name: '',
    type: '',
    location: '',
    startDate: '',
    endDate: '',
    budget: 0,
    status: 'Planning',
    progress: 0,
    description: '',
    phases: ['Foundation', 'Structure', 'Finishing']
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    if (!projectData.name || !projectData.type || !projectData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    addProject({
      name: projectData.name,
      type: projectData.type,
      location: projectData.location,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      budget: projectData.budget,
      status: projectData.status,
      progress: projectData.progress
    });
    
    onNavigate('/projects');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="type">Project Type *</Label>
              <Select value={projectData.type} onValueChange={(value) => setProjectData({...projectData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={projectData.location}
                onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                placeholder="Project location"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => setProjectData({...projectData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={projectData.endDate}
                  onChange={(e) => setProjectData({...projectData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                placeholder="Describe the project scope and requirements"
                rows={4}
              />
            </div>
            <div>
              <Label>Project Phases</Label>
              {projectData.phases.map((phase, index) => (
                <Input
                  key={index}
                  value={phase}
                  onChange={(e) => {
                    const newPhases = [...projectData.phases];
                    newPhases[index] = e.target.value;
                    setProjectData({...projectData, phases: newPhases});
                  }}
                  className="mb-2"
                />
              ))}
              <Button
                variant="outline"
                onClick={() => setProjectData({...projectData, phases: [...projectData.phases, '']})}
              >
                Add Phase
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Estimated Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                value={projectData.budget}
                onChange={(e) => setProjectData({...projectData, budget: parseInt(e.target.value) || 0})}
                placeholder="Enter estimated project budget"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">AI Budget Estimation</h4>
              <p className="text-blue-700 text-sm mb-2">Based on similar projects in your area:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Materials (60%):</span>
                  <span>₹{(projectData.budget * 0.6).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Labor (30%):</span>
                  <span>₹{(projectData.budget * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment (10%):</span>
                  <span>₹{(projectData.budget * 0.1).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div><strong>Name:</strong> {projectData.name}</div>
              <div><strong>Type:</strong> {projectData.type}</div>
              <div><strong>Location:</strong> {projectData.location}</div>
              <div><strong>Duration:</strong> {projectData.startDate} to {projectData.endDate}</div>
              <div><strong>Budget:</strong> ₹{projectData.budget.toLocaleString()}</div>
              <div><strong>Phases:</strong> {projectData.phases.filter(p => p).join(', ')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">✓ Ready to create project</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => onNavigate('/projects')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Project</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step {currentStep} of 4</CardTitle>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded ${
                  step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep === 4 ? (
              <Button onClick={handleSubmit}>
                <Check className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;
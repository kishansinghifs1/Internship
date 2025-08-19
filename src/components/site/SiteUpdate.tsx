import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, Camera, MapPin, Calendar, Cloud, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

interface SiteUpdateProps {
  onNavigate: (path: string) => void;
}

const SiteUpdate: React.FC<SiteUpdateProps> = ({ onNavigate }) => {
  const { projects } = useAppContext();
  const [updateData, setUpdateData] = useState({
    project: '',
    phase: '',
    description: '',
    weather: 'sunny',
    location: '',
    tags: [] as string[],
    files: [] as File[]
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setUpdateData({...updateData, files: [...updateData.files, ...files]});
            toast({
              title: "Files Uploaded",
              description: `${files.length} file(s) uploaded successfully`
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUpdateData({
      ...updateData,
      files: updateData.files.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = () => {
    if (!updateData.project || !updateData.description) {
      toast({
        title: "Validation Error",
        description: "Please select a project and add a description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Site Update Added",
      description: "Your site update has been submitted and will be processed by AI."
    });
    onNavigate('/dashboard');
  };

  const addTag = (tag: string) => {
    if (tag && !updateData.tags.includes(tag)) {
      setUpdateData({...updateData, tags: [...updateData.tags, tag]});
    }
  };

  const removeTag = (tagToRemove: string) => {
    setUpdateData({...updateData, tags: updateData.tags.filter(tag => tag !== tagToRemove)});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => onNavigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Add Site Update</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location & Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="project">Project *</Label>
              <Select value={updateData.project} onValueChange={(value) => setUpdateData({...updateData, project: value})}>
                <SelectTrigger>
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
            </div>
            
            <div>
              <Label htmlFor="phase">Phase/Zone</Label>
              <Select value={updateData.phase} onValueChange={(value) => setUpdateData({...updateData, phase: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foundation">Foundation</SelectItem>
                  <SelectItem value="structure">Structure</SelectItem>
                  <SelectItem value="finishing">Finishing</SelectItem>
                  <SelectItem value="excavation">Excavation</SelectItem>
                  <SelectItem value="framing">Framing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date & Time
                </Label>
                <Input type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Weather
                </Label>
                <Select value={updateData.weather} onValueChange={(value) => setUpdateData({...updateData, weather: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunny">☀️ Sunny</SelectItem>
                    <SelectItem value="cloudy">☁️ Cloudy</SelectItem>
                    <SelectItem value="rainy">🌧️ Rainy</SelectItem>
                    <SelectItem value="windy">💨 Windy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Media Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Drag and drop files or click to upload</p>
              <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, MP4, MOV (Max 10MB each)</p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" type="button" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </Button>
              </Label>
            </div>
            
            {uploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Uploading files...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
            
            {updateData.files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Uploaded files:</p>
                <div className="space-y-2">
                  {updateData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(1)}MB</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Work Completed & Notes *</Label>
              <Textarea
                id="description"
                value={updateData.description}
                onChange={(e) => setUpdateData({...updateData, description: e.target.value})}
                placeholder="Describe the work completed, any issues encountered, or observations..."
                rows={4}
              />
            </div>
            
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {updateData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['Equipment', 'Safety', 'Material', 'Delay', 'Quality', 'Progress', 'Issue'].map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(tag)}
                    disabled={updateData.tags.includes(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Processing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Enable AI anomaly detection</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Compare with BIM model (if available)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Generate progress report</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Auto-notify project team</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onNavigate('/dashboard')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploading}>
            Submit Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SiteUpdate;
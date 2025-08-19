import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, TrendingUp, Download, Plus, Zap, FileText, Users, Calendar, DollarSign, Activity } from 'lucide-react';

interface AnalyticsDashboardProps {
  onNavigate: (path: string) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ onNavigate }) => {
  const { projects, users } = useAppContext();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || '');

  const handleExportReport = () => {
    toast({ title: 'Exporting Report...', description: 'Your analytics report is being generated.' });
    setTimeout(() => {
      toast({ title: 'Report Downloaded!', description: 'Analytics report has been saved to your downloads.' });
    }, 2000);
  };

  const handleCreateWidget = () => {
    toast({ title: 'Widget Created!', description: 'New analytics widget has been added to your dashboard.' });
  };

  const handleApplyAIRecommendations = () => {
    toast({ title: 'AI Recommendations Applied!', description: 'AI-powered optimizations have been implemented.' });
  };

  const handleDownloadRecentReport = () => {
    toast({ title: 'Downloading Report...', description: 'Recent project report is being downloaded.' });
    setTimeout(() => {
      toast({ title: 'Download Complete!', description: 'Report downloaded successfully.' });
    }, 1500);
  };

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const totalUsers = users.length;

  const kpis = [
    { title: 'Total Projects', value: projects.length, icon: FileText, color: 'text-blue-600' },
    { title: 'Active Projects', value: activeProjects, icon: Activity, color: 'text-green-600' },
    { title: 'Completed Projects', value: completedProjects, icon: BarChart3, color: 'text-purple-600' },
    { title: 'Total Budget', value: `₹${(totalBudget / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-orange-600' },
    { title: 'Team Members', value: totalUsers, icon: Users, color: 'text-indigo-600' },
    { title: 'Success Rate', value: '95%', icon: TrendingUp, color: 'text-emerald-600' }
  ];

  const recentReports = [
    { name: 'Monthly Progress Report', date: '2024-01-15', type: 'Progress', size: '2.4 MB' },
    { name: 'Budget Analysis Report', date: '2024-01-10', type: 'Financial', size: '1.8 MB' },
    { name: 'Site Verification Summary', date: '2024-01-08', type: 'Quality', size: '3.1 MB' },
    { name: 'Team Performance Report', date: '2024-01-05', type: 'HR', size: '1.2 MB' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExportReport} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleCreateWidget} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Widget
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.location}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {project.status}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">₹{(project.budget / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No project data available</p>
                <Button onClick={() => onNavigate('/create-project')} className="mt-4">
                  Create Your First Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button onClick={handleDownloadRecentReport} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <p className="text-xs text-gray-600">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>AI Recommendations</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">Smart insights to optimize your projects</p>
            </div>
            <Button onClick={handleApplyAIRecommendations} className="bg-yellow-600 hover:bg-yellow-700">
              <Zap className="h-4 w-4 mr-2" />
              Apply AI Recommendations
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Budget Optimization</h4>
              <p className="text-sm text-blue-700">Reduce material costs by 15% through bulk purchasing and vendor negotiations.</p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-medium text-green-900 mb-2">Timeline Improvement</h4>
              <p className="text-sm text-green-700">Optimize task scheduling to complete projects 20% faster with current resources.</p>
            </div>
            <div className="p-4 border rounded-lg bg-purple-50">
              <h4 className="font-medium text-purple-900 mb-2">Quality Enhancement</h4>
              <p className="text-sm text-purple-700">Implement additional quality checkpoints to reduce rework by 30%.</p>
            </div>
            <div className="p-4 border rounded-lg bg-orange-50">
              <h4 className="font-medium text-orange-900 mb-2">Resource Allocation</h4>
              <p className="text-sm text-orange-700">Redistribute team members across projects for optimal productivity.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
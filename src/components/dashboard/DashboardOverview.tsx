import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  Camera,
  Plus,
  Eye,
  ArrowRight
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (path: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+2 from last month',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Budget Utilization',
      value: '₹2.4M',
      change: '78% of allocated budget',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Team Members',
      value: '45',
      change: '+5 new members',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      change: '+12% this quarter',
      icon: CheckCircle,
      color: 'text-orange-600'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Mumbai Tower Complex',
      status: 'In Progress',
      progress: 78,
      budget: '₹1.2M',
      deadline: '2024-12-15',
      manager: 'Rajesh Kumar'
    },
    {
      id: 2,
      name: 'Pune Residential Project',
      status: 'On Track',
      progress: 65,
      budget: '₹800K',
      deadline: '2024-11-30',
      manager: 'Priya Sharma'
    },
    {
      id: 3,
      name: 'Delhi Commercial Hub',
      status: 'Delayed',
      progress: 45,
      budget: '₹1.5M',
      deadline: '2025-01-20',
      manager: 'Amit Patel'
    }
  ];

  const aiAlerts = [
    {
      type: 'warning',
      message: 'Mumbai Tower project may exceed budget by 12%',
      time: '2 hours ago',
      severity: 'high'
    },
    {
      type: 'info',
      message: 'Material delivery scheduled for Pune project',
      time: '4 hours ago',
      severity: 'medium'
    },
    {
      type: 'success',
      message: 'Quality inspection passed for Delhi project',
      time: '1 day ago',
      severity: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('/create-project')}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline" onClick={() => onNavigate('/site-update')}>
            <Camera className="h-4 w-4 mr-2" />
            Site Update
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Button variant="outline" size="sm" onClick={() => onNavigate('/projects')}>
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-500">PM: {project.manager}</p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Budget: {project.budget}</span>
                        <span>Due: {project.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Alerts */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Alerts</CardTitle>
              <Button variant="outline" size="sm" onClick={() => onNavigate('/analytics')}>
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {aiAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" onClick={() => onNavigate('/create-project')}>
              <Plus className="h-6 w-6 mb-2" />
              Create Project
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => onNavigate('/site-update')}>
              <Camera className="h-6 w-6 mb-2" />
              Add Site Update
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => onNavigate('/marketplace')}>
              <Users className="h-6 w-6 mb-2" />
              Find Vendor
            </Button>
            <Button variant="outline" className="h-20 flex-col" onClick={() => onNavigate('/analytics')}>
              <BarChart3 className="h-6 w-6 mb-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
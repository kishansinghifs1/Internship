import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calculator, Search, Monitor, FileText, MessageCircle, BarChart3, TrendingUp, Users, Star, CheckCircle, Zap, Globe, Layers } from 'lucide-react';

interface ServicesProps {
  onNavigate?: (path: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const clientServices = [
    { icon: Calculator, title: 'AI Budget Estimator', desc: 'Get accurate cost estimates powered by AI' },
    { icon: Search, title: 'Builder Discovery', desc: 'Find verified builders in your area' },
    { icon: Monitor, title: 'Live Project Dashboard', desc: 'Real-time project tracking and updates' },
    { icon: FileText, title: 'Digital Contracts', desc: 'Secure digital contract management' },
    { icon: MessageCircle, title: '24/7 AI Chatbot Support', desc: 'Instant support and guidance' }
  ];

  const builderServices = [
    { icon: BarChart3, title: 'Project Management Dashboard', desc: 'Comprehensive project oversight' },
    { icon: TrendingUp, title: 'Auto-Generated Estimates', desc: 'AI-powered cost estimation' },
    { icon: Users, title: 'Lead Generation', desc: 'Connect with potential clients' },
    { icon: Star, title: 'Client Feedback System', desc: 'Manage reviews and ratings' }
  ];

  const premiumServices = [
    { price: '₹1,999/month', title: 'Builder Dashboard & Leads', desc: 'Complete builder toolkit' },
    { price: '₹4,999 (One-Time)', title: 'Design Help Package', desc: 'Professional design assistance' },
    { price: '₹10,000/month', title: 'VIP Services for Clients', desc: 'Premium client experience' }
  ];

  const whyChoose = [
    { icon: CheckCircle, title: 'Transparent & Verified Builders', desc: 'All builders are thoroughly verified' },
    { icon: Zap, title: 'AI-Powered Management', desc: 'Cost, time & quality optimization' },
    { icon: Users, title: 'Seamless Collaboration', desc: 'Enhanced team communication' },
    { icon: Globe, title: 'Built for Indian Market', desc: 'Designed for local needs' },
    { icon: Layers, title: 'Scalable Solutions', desc: 'For all project sizes' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            BuildBridge AI is your intelligent construction partner, revolutionizing how construction projects are managed, 
            executed, and delivered. We combine cutting-edge artificial intelligence with deep industry expertise to provide 
            transparent, efficient, and cost-effective solutions for clients, builders, and vendors across India.
          </p>
        </div>
      </div>

      {/* Services We Offer */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Services We Offer</h2>
        
        {/* For Clients */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">For Clients</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* For Builders */}
        <div>
          <h3 className="text-2xl font-semibold text-green-600 mb-6">For Builders</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {builderServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-green-600" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Premium Services */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Premium Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {premiumServices.map((service, index) => (
            <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="w-fit mx-auto mb-2 bg-purple-100 text-purple-800">
                  {service.price}
                </Badge>
                <CardTitle className="text-xl text-purple-700">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose BuildBridge AI */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose BuildBridge AI?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Construction Experience?</h2>
        <p className="text-xl mb-6">Join thousands of satisfied clients and builders using BuildBridge AI</p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => onNavigate?.('/dashboard')}
          >
            Get Started Today
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
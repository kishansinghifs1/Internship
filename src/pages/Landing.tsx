import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Users, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';

interface LandingProps {
  onLoginClick: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLoginClick }) => {
  const features = [
    {
      icon: Building2,
      title: 'Project Management',
      description: 'Track construction projects with real-time updates and AI-powered insights.'
    },
    {
      icon: Users,
      title: 'Vendor Marketplace',
      description: 'Connect with verified vendors and manage procurement seamlessly.'
    },
    {
      icon: BarChart3,
      title: 'AI Analytics',
      description: 'Get predictive insights and budget optimization recommendations.'
    },
    {
      icon: Shield,
      title: 'Site Verification',
      description: 'Computer vision-powered quality control and progress tracking.'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '₹2,999',
      period: '/month',
      features: ['Up to 5 projects', 'Basic analytics', 'Email support', 'Vendor marketplace access']
    },
    {
      name: 'Professional',
      price: '₹9,999',
      period: '/month',
      features: ['Unlimited projects', 'AI budget estimator', 'Site verification', 'Priority support', 'Advanced analytics']
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Custom integrations', 'Dedicated support', 'White-label options', 'API access', 'Custom AI models']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">BuildBridge AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Contact</Button>
              <Button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700">
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Construction Management
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Smarter with
            <span className="text-blue-600"> AI Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your construction projects with real-time tracking, AI-powered budget estimation, 
            and intelligent site verification. Join thousands of construction professionals already using BuildBridge AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onLoginClick} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Try Demo Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Modern Construction</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage construction projects efficiently and profitably.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">Start free, scale as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 1 ? 'default' : 'outline'}>
                    {index === 2 ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Construction Projects?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of construction professionals using BuildBridge AI to build smarter and faster.
          </p>
          <Button onClick={onLoginClick} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Try Demo Login Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-lg font-bold">BuildBridge AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered construction management platform for modern builders.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Status</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BuildBridge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
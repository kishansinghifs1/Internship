import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, Award, Lightbulb, Heart, Globe, TrendingUp, Shield } from 'lucide-react';

interface AboutUsProps {
  onNavigate?: (path: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  const teamMembers = [
    { name: 'Rajesh Kumar', role: 'CEO & Founder', experience: '15+ years in construction', image: '/placeholder.svg' },
    { name: 'Priya Sharma', role: 'CTO', experience: 'AI & Tech Expert', image: '/placeholder.svg' },
    { name: 'Amit Patel', role: 'Head of Operations', experience: '12+ years project management', image: '/placeholder.svg' },
    { name: 'Sneha Gupta', role: 'Head of Design', experience: 'UX/UI Specialist', image: '/placeholder.svg' }
  ];

  const values = [
    { icon: Shield, title: 'Transparency', desc: 'Complete visibility in all processes and pricing' },
    { icon: Heart, title: 'Trust', desc: 'Building lasting relationships with verified partners' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Leveraging AI to solve construction challenges' },
    { icon: Award, title: 'Quality', desc: 'Ensuring excellence in every project delivery' }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed', icon: TrendingUp },
    { number: '200+', label: 'Verified Builders', icon: Users },
    { number: '50+', label: 'Cities Covered', icon: Globe },
    { number: '95%', label: 'Client Satisfaction', icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">About BuildBridge AI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are revolutionizing the construction industry in India by bridging the gap between 
          clients, builders, and technology through intelligent AI-powered solutions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-blue-600" />
              <CardTitle className="text-2xl text-blue-800">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              To democratize construction project management by providing transparent, 
              AI-driven solutions that ensure quality, timeliness, and cost-effectiveness 
              for every stakeholder in the construction ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Lightbulb className="h-8 w-8 text-purple-600" />
              <CardTitle className="text-2xl text-purple-800">Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become India's leading construction technology platform, where every 
              construction project is delivered with complete transparency, optimal 
              efficiency, and zero surprises.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Our Story */}
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Story</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            Founded in 2023, BuildBridge AI emerged from a simple observation: the construction 
            industry in India was plagued by miscommunication, cost overruns, and quality issues. 
            Our founders, with decades of combined experience in construction and technology, 
            envisioned a platform that could solve these age-old problems.
          </p>
          <p>
            Starting with a small team of passionate engineers and construction experts, we developed 
            our first AI-powered cost estimation tool. The response was overwhelming - builders loved 
            the accuracy, and clients appreciated the transparency.
          </p>
          <p>
            Today, BuildBridge AI serves hundreds of projects across India, from residential homes 
            to commercial complexes, ensuring that every stakeholder has the tools and insights 
            they need for successful project delivery.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="h-12 w-12 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-lg">{achievement.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <Badge variant="secondary">{member.role}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{member.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-xl mb-6">Be part of the construction revolution in India</p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => onNavigate?.('/dashboard')}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
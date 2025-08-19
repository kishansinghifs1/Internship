import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MapPin, Phone, Mail, Search } from 'lucide-react';

interface MarketplaceViewProps {
  onNavigate: (path: string) => void;
}

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const vendors = [
    {
      id: 1,
      name: 'Steel Solutions Ltd',
      type: 'Material Supplier',
      region: 'Mumbai',
      rating: 4.8,
      reviews: 124,
      services: ['Steel Supply', 'Fabrication', 'Installation'],
      contact: '+91 98765 43210',
      email: 'contact@steelsolutions.com',
      verified: true
    },
    {
      id: 2,
      name: 'BuildTech Contractors',
      type: 'Construction',
      region: 'Delhi',
      rating: 4.6,
      reviews: 89,
      services: ['Civil Work', 'Electrical', 'Plumbing'],
      contact: '+91 98765 43211',
      email: 'info@buildtech.com',
      verified: true
    },
    {
      id: 3,
      name: 'Concrete Masters',
      type: 'Material Supplier',
      region: 'Bangalore',
      rating: 4.9,
      reviews: 156,
      services: ['Ready Mix Concrete', 'Pumping', 'Testing'],
      contact: '+91 98765 43212',
      email: 'orders@concretemasters.com',
      verified: false
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = regionFilter === 'all' || vendor.region === regionFilter;
    const matchesType = typeFilter === 'all' || vendor.type === typeFilter;
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Marketplace</h1>
          <p className="text-gray-600">Find and connect with verified vendors</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vendors or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Material Supplier">Material Supplier</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  <p className="text-sm text-gray-600">{vendor.type}</p>
                </div>
                {vendor.verified && (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{vendor.rating}</span>
                <span className="text-sm text-gray-500">({vendor.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {vendor.region}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {vendor.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.contact}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {vendor.email}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button className="flex-1" onClick={() => onNavigate(`/vendors/${vendor.id}`)}>
                  View Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;
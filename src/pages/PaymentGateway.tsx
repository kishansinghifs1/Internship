import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Shield, CheckCircle, Star, Zap, Users } from 'lucide-react';

interface PaymentGatewayProps {
  onNavigate?: (path: string) => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    state: '',
    pincode: ''
  });

  const plans = [
    {
      id: 'builder-basic',
      name: 'Builder Dashboard & Leads',
      price: '₹1,999',
      period: '/month',
      features: ['Project Management Dashboard', 'Lead Generation', 'Basic Analytics', 'Email Support'],
      popular: false
    },
    {
      id: 'design-package',
      name: 'Design Help Package',
      price: '₹4,999',
      period: '(One-Time)',
      features: ['Professional Design Consultation', 'Blueprint Review', 'Design Optimization', 'Priority Support'],
      popular: true
    },
    {
      id: 'vip-client',
      name: 'VIP Services for Clients',
      price: '₹10,000',
      period: '/month',
      features: ['Dedicated Project Manager', 'Priority Builder Matching', 'Advanced Analytics', '24/7 Phone Support'],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI Payment', icon: Zap },
    { id: 'netbanking', name: 'Net Banking', icon: Shield }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    if (!selectedPlan) {
      toast({
        title: 'Select a Plan',
        description: 'Please select a subscription plan to proceed.',
        variant: 'destructive'
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: 'Select Payment Method',
        description: 'Please choose a payment method.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: 'Processing Payment...',
      description: 'Please wait while we process your payment.'
    });

    setTimeout(() => {
      toast({
        title: 'Payment Successful!',
        description: 'Your subscription has been activated. Welcome to BuildBridge AI!'
      });
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        onNavigate?.('/dashboard');
      }, 2000);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the perfect plan for your construction needs and start transforming your projects today.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative cursor-pointer transition-all ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            } ${plan.popular ? 'border-purple-200' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-blue-600">
                {plan.price}
                <span className="text-lg font-normal text-gray-600">{plan.period}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full mt-6 ${
                  selectedPlan === plan.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div 
                    key={method.id}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <Icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{method.name}</span>
                    {paymentMethod === method.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600 ml-auto" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethod === 'card' && (
                <>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                </>
              )}
              
              {paymentMethod === 'upi' && (
                <div className="text-center py-8">
                  <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">UPI Payment</h3>
                  <p className="text-gray-600">You will be redirected to your UPI app to complete the payment</p>
                </div>
              )}
              
              {paymentMethod === 'netbanking' && (
                <div>
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order Summary & Payment Button */}
      {selectedPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Selected Plan:</span>
                <span className="font-semibold">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {plans.find(p => p.id === selectedPlan)?.price}
                  {plans.find(p => p.id === selectedPlan)?.period}
                </span>
              </div>
              <div className="border-t pt-4">
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  disabled={!paymentMethod}
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Complete Secure Payment
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center">
                <Shield className="h-4 w-4 inline mr-1" />
                Your payment is secured with 256-bit SSL encryption
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trust Indicators */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted by 500+ Construction Professionals</h3>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">200+ Verified Builders</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">95% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">Bank-Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
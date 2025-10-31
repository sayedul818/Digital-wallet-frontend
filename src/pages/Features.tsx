import { Card, CardContent } from '@/components/ui/card';
import {
  Wallet,
  Send,
  TrendingUp,
  Shield,
  Smartphone,
  Clock,
  BarChart3,
  Bell,
  Users,
  Lock,
  Zap,
  Globe,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Digital Wallet',
      description: 'Store and manage your money securely in your digital wallet with real-time balance updates.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Send,
      title: 'Instant Transfers',
      description: 'Send money to anyone instantly using their phone number or email address.',
      color: 'bg-gradient-accent',
    },
    {
      icon: TrendingUp,
      title: 'Transaction History',
      description: 'Track all your transactions with detailed history, filters, and export options.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your data and money are protected with enterprise-grade encryption and security.',
      color: 'bg-gradient-accent',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Full-featured mobile experience that works seamlessly on all devices.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access your wallet and make transactions anytime, anywhere, 24/7.',
      color: 'bg-gradient-accent',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Visualize your spending patterns and financial trends with detailed analytics.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Get instant notifications for all transactions and important account activities.',
      color: 'bg-gradient-accent',
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Separate interfaces for users, agents, and admins with role-specific features.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Lock,
      title: 'Two-Factor Authentication',
      description: 'Additional layer of security with optional two-factor authentication.',
      color: 'bg-gradient-accent',
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Perform common tasks quickly with shortcuts and smart suggestions.',
      color: 'bg-gradient-primary',
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description: 'Support for multiple currencies with real-time conversion rates.',
      color: 'bg-gradient-accent',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to manage your digital finances efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className={`h-14 w-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            And Much More...
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            We're constantly adding new features and improvements based on user feedback. Your input helps us build the best digital wallet experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

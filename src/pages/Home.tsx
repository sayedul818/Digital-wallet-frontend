import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wallet, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Lock,
  ArrowRight 
} from 'lucide-react';
import heroImage from '@/assets/hero-wallet.jpg';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Bank-level security with end-to-end encryption for all your transactions.',
    },
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Send and receive money instantly with zero delays.',
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Designed for users, agents, and admins with tailored experiences.',
    },
    {
      icon: TrendingUp,
      title: 'Track Spending',
      description: 'Comprehensive transaction history and analytics at your fingertips.',
    },
    {
      icon: Lock,
      title: 'Protected Funds',
      description: 'Your money is protected with advanced security protocols.',
    },
    {
      icon: Wallet,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for everyone.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                Your Money, Simplified
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Experience the future of digital payments with PayWallet. Send, receive, and manage your money with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary-foreground">50K+</div>
                  <div className="text-sm text-primary-foreground/80">Active Users</div>
                </div>
                <div className="h-12 w-px bg-primary-foreground/20" />
                <div>
                  <div className="text-3xl font-bold text-primary-foreground">$2M+</div>
                  <div className="text-sm text-primary-foreground/80">Transactions</div>
                </div>
                <div className="h-12 w-px bg-primary-foreground/20" />
                <div>
                  <div className="text-3xl font-bold text-primary-foreground">99.9%</div>
                  <div className="text-sm text-primary-foreground/80">Uptime</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img
                src={heroImage}
                alt="Digital Wallet Interface"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose PayWallet?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your finances in one secure platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PayWallet for their daily transactions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About PayWallet
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Building the future of digital payments
          </p>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-lg leading-relaxed">
              PayWallet was founded with a simple mission: to make digital transactions accessible, secure, and instant for everyone. We believe that managing money should be simple, transparent, and empowering.
            </p>
            <p className="text-lg leading-relaxed">
              Our platform serves users, agents, and businesses with a comprehensive suite of financial tools designed for the modern era. With bank-level security and lightning-fast transactions, we're redefining what a digital wallet can do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To democratize financial services and make digital payments accessible to everyone, everywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  A world where financial transactions are instant, secure, and free from barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  Security, transparency, innovation, and customer-first approach in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We're a diverse team of financial experts, security engineers, and designers passionate about creating the best digital wallet experience. Our combined expertise ensures that PayWallet remains at the forefront of fintech innovation.
            </p>
            <p className="text-lg text-muted-foreground">
              Every day, we work to improve our platform, add new features, and ensure that your money is always safe and accessible when you need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

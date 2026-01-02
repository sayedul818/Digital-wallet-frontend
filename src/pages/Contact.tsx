import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Have questions? We'd love to hear from you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">support@PayzaGo.com</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card text-center">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Office</h3>
                <p className="text-sm text-muted-foreground">123 Fintech Ave, NY</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

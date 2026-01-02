import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, Users, Database, Shield } from 'lucide-react';

const Privacy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account or conduct a transaction. This includes your name, email address, phone number, payment information, and any other information you choose to provide. We also automatically collect certain information when you use our services, including your IP address, browser type, operating system, and pages visited."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you service announcements and support messages, respond to your inquiries, and comply with legal obligations. We may also use your information to detect, prevent, and address fraud, security, and technical issues."
    },
    {
      title: "3. Data Security",
      content: "We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, firewalls, and regular security audits. However, no method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security."
    },
    {
      title: "4. Sharing Your Information",
      content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose your information when required by law or to protect our rights and safety."
    },
    {
      title: "5. Your Privacy Rights",
      content: "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. To exercise these rights, please contact us at privacy@PayzaGo.com. We will respond to your request within 30 days."
    },
    {
      title: "6. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings. Please note that disabling cookies may affect the functionality of our services."
    },
    {
      title: "7. Children's Privacy",
      content: "PayzaGo does not knowingly collect personal information from children under the age of 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information and terminate the child's account."
    },
    {
      title: "8. Policy Changes",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the 'last updated' date. Your continued use of PayzaGo following any changes constitutes your acceptance of the new Privacy Policy."
    },
  ];

  const features = [
    { icon: Lock, title: "End-to-End Encryption", desc: "Your data is encrypted in transit and at rest" },
    { icon: Eye, title: "Privacy Control", desc: "You control who sees your information" },
    { icon: Users, title: "No Selling Data", desc: "We never sell your personal data" },
    { icon: Database, title: "Secure Storage", desc: "Data stored on secure, compliant servers" },
    { icon: Shield, title: "Regular Audits", desc: "Security audits and compliance checks" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-primary text-primary-foreground py-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Last updated: January 2, 2026</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        {/* Privacy Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="border-0 shadow-card text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mb-12 text-lg"
          >
            At PayzaGo, we prioritize your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {sections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="border-0 shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us at privacy@PayzaGo.com
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

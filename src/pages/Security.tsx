import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle, CheckCircle, Zap, Eye, Lock } from 'lucide-react';

const Security = () => {
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
      title: "1. Data Encryption",
      content: "All sensitive data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS encryption. This ensures that your personal and financial information cannot be intercepted or compromised during transmission."
    },
    {
      title: "2. Secure Storage",
      content: "Your personal and financial information is stored on secure, PCI-compliant servers with multiple layers of protection. We use advanced database encryption and regular security backups to ensure data integrity and availability."
    },
    {
      title: "3. Authentication & Access Control",
      content: "We implement strong authentication mechanisms including secure password policies and optional two-factor authentication (2FA). Access to your account is restricted to authorized personnel only, and all access is logged and monitored."
    },
    {
      title: "4. Fraud Detection & Prevention",
      content: "We employ advanced fraud detection systems that monitor transactions in real-time for suspicious activity. Our machine learning algorithms identify and prevent fraudulent transactions before they occur."
    },
    {
      title: "5. Regular Security Audits",
      content: "PayzaGo conducts regular security audits and penetration testing to identify and address vulnerabilities. We partner with independent security firms to ensure our systems meet the highest security standards."
    },
    {
      title: "6. Compliance & Standards",
      content: "We comply with international security standards including PCI DSS, ISO 27001, and GDPR. Our security practices are regularly reviewed and updated to meet evolving threats and regulatory requirements."
    },
    {
      title: "7. Incident Response",
      content: "In the unlikely event of a security incident, we have a comprehensive incident response plan in place. We will promptly investigate, contain, and remediate any security issues and notify affected users as required by law."
    },
    {
      title: "8. User Responsibility",
      content: "Your account security also depends on your actions. Please keep your password confidential, log out after using shared devices, and report any suspicious activity immediately. Enable 2FA for additional protection."
    },
  ];

  const securityFeatures = [
    { icon: Shield, title: "Multi-Layer Security", color: "text-primary" },
    { icon: Lock, title: "Military-Grade Encryption", color: "text-success" },
    { icon: Eye, title: "24/7 Monitoring", color: "text-accent" },
    { icon: CheckCircle, title: "Compliance Certified", color: "text-primary" },
    { icon: Zap, title: "Real-Time Protection", color: "text-destructive" },
    { icon: AlertCircle, title: "Instant Alerts", color: "text-yellow-600" },
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Shield className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl font-bold">Security</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Your trust is our priority. Learn about our security measures.</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        {/* Security Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {securityFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="border-0 shadow-card hover:shadow-lg transition-all hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                      </div>
                    </div>
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
            At PayzaGo, security is not an afterthought—it's embedded in every layer of our platform. We invest heavily in state-of-the-art security infrastructure, continuous monitoring, and regular updates to protect your funds and personal information.
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
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Security Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-card bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-accent" />
                  Security Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Use a strong, unique password with a mix of letters, numbers, and symbols</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Enable two-factor authentication for additional account protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Never share your password or 2FA codes with anyone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Log out after using PayzaGo on shared devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Keep your device software and antivirus updated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Report any suspicious activity to our security team immediately</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Report Security Issues:</strong> If you discover a security vulnerability, please report it responsibly to security@PayzaGo.com. We have a bug bounty program to reward responsible disclosure.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Security;

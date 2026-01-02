import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

const Terms = () => {
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
      title: "1. Agreement to Terms",
      content: "By accessing and using PayzaGo, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on PayzaGo for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile, disassemble or reverse engineer any software contained on PayzaGo."
    },
    {
      title: "3. Disclaimer",
      content: "The materials on PayzaGo are provided on an 'as is' basis. PayzaGo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: "4. Limitations",
      content: "In no event shall PayzaGo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PayzaGo, even if PayzaGo or an authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      title: "5. Accuracy of Materials",
      content: "The materials appearing on PayzaGo could include technical, typographical, or photographic errors. PayzaGo does not warrant that any of the materials on its website are accurate, complete, or current. PayzaGo may make changes to the materials contained on its website at any time without notice."
    },
    {
      title: "6. Links",
      content: "PayzaGo has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PayzaGo of the site. Use of any such linked website is at the user's own risk."
    },
    {
      title: "7. Modifications",
      content: "PayzaGo may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service."
    },
    {
      title: "8. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which PayzaGo is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
    },
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
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FileText className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Last updated: January 2, 2026</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mb-12 text-lg"
          >
            Please read these terms of service carefully before using PayzaGo. Your access to and use of PayzaGo is conditioned on your acceptance of and compliance with these terms and all other operating rules, policies, and procedures that may be published by PayzaGo from time to time.
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20"
          >
            <p className="text-sm text-muted-foreground">
              <strong>Contact Us:</strong> If you have any questions about these Terms of Service, please contact us at legal@PayzaGo.com
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

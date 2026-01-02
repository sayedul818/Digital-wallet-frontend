import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageSquare, Mail, Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the Register button, fill in your details including name, email, phone number, and password. Choose your role (User or Agent) and submit. Your account will be created instantly."
    },
    {
      question: "How can I deposit money?",
      answer: "Go to your Dashboard, click the 'Deposit Money' button, select an agent by their email or phone number, enter the amount, and submit the request. The agent will process your request."
    },
    {
      question: "What is the withdrawal process?",
      answer: "Navigate to the Withdraw page from your dashboard, select an agent, enter the amount you want to withdraw, and submit. The agent will approve the request and transfer funds to you."
    },
    {
      question: "How do I send money to another user?",
      answer: "Go to Send Money in the user sidebar, enter the recipient's phone number, specify the amount, and click Send. The transfer will be processed instantly."
    },
    {
      question: "How can I become an agent?",
      answer: "During registration, select the 'Agent' role. Complete your profile and wait for admin approval. Once approved, you'll gain access to agent features."
    },
    {
      question: "Is my money secure?",
      answer: "Yes! We use end-to-end encryption, secure servers, and follow industry best practices to protect your data and funds. All transactions are monitored for security."
    },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
              <HelpCircle className="h-12 w-12" />
            </motion.div>
            <h1 className="text-4xl font-bold">Help Center</h1>
          </div>
          <p className="text-primary-foreground/80 text-lg">Get answers to common questions and learn how to use PayWallet</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Contact */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-3">support@paywallet.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-3">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-3">Available 24/7</p>
                    <p className="text-xs text-muted-foreground">Instant support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} layoutId={`faq-${idx}`}>
                <Card
                  className="border-0 shadow-card cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      <motion.div
                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <motion.div
                    animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;

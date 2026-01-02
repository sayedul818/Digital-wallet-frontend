import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on "Get Started" or "Register" button and fill in your details. Choose your role (User or Agent) and complete the registration process. You\'ll receive a confirmation and can start using your wallet immediately.',
    },
    {
      question: 'Is PayzaGo secure?',
      answer: 'Yes, absolutely! We use bank-level encryption for all transactions and data. Your sensitive information is protected with industry-standard security protocols, including SSL encryption, secure authentication, and regular security audits.',
    },
    {
      question: 'How long do transactions take?',
      answer: 'Transactions on PayzaGo are instant! Money is transferred immediately between wallets. You\'ll receive real-time notifications for all transactions.',
    },
    {
      question: 'What are the transaction fees?',
      answer: 'PayzaGo offers competitive transaction fees. Basic transfers between users are free. Agent transactions may have minimal service charges. Check our pricing page for detailed fee structure.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer: 'You can add money through our verified agents. Visit the "Deposit Money" section, select an agent near you, and complete the cash-in process. The money will be reflected in your wallet instantly.',
    },
    {
      question: 'Can I withdraw my money?',
      answer: 'Yes, you can withdraw money anytime through our agent network or direct bank transfers. Just go to "Withdraw Money", enter the amount, and choose your preferred withdrawal method.',
    },
    {
      question: 'What if I send money to the wrong person?',
      answer: 'Contact our support immediately if you\'ve sent money to the wrong recipient. While we can\'t reverse completed transactions, our team will work to help resolve the issue. Always verify recipient details before confirming transfers.',
    },
    {
      question: 'How do I become an agent?',
      answer: 'To become an agent, register with the "Agent" role and complete the verification process. You\'ll need to provide business documentation. Once approved by our admin team, you can start serving customers.',
    },
    {
      question: 'Is there a transaction limit?',
      answer: 'Transaction limits depend on your account verification level. Verified accounts have higher limits. Check your account settings to see your current limits and how to increase them.',
    },
    {
      question: 'Can I use PayzaGo on multiple devices?',
      answer: 'Yes, you can access your PayzaGo account from any device. Simply log in with your credentials. For security, you\'ll receive notifications when your account is accessed from a new device.',
    },
    {
      question: 'How do I track my transactions?',
      answer: 'All transactions are available in your "Transactions" page. You can filter by type, date range, and search for specific transactions. You can also export your transaction history for record-keeping.',
    },
    {
      question: 'What should I do if I forget my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the instructions. You\'ll receive a password reset link via email. Make sure to use a strong, unique password for your account security.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-16">
            Find answers to common questions about PayzaGo
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6 shadow-sm bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 bg-muted/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

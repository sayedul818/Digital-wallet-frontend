
import HeroSection from '@/components/home/HeroSection';
import WalletFeatures from '@/components/home/WalletFeatures';
import SecurityHighlights from '@/components/home/SecurityHighlights';
import TransactionsPreview from '@/components/home/TransactionsPreview';
import WalletStatistics from '@/components/home/WalletStatistics';
import PaymentMethods from '@/components/home/PaymentMethods';
import AgentsNetwork from '@/components/home/AgentsNetwork';
import LogoSlider from '@/components/home/LogoSlider';
import Testimonials from '@/components/home/Testimonials';
import BlogUpdates from '@/components/home/BlogUpdates';
import FAQ from '@/components/home/FAQ';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const Home: React.FC = () => (
  <main>
    <HeroSection />
    <WalletFeatures />
    <SecurityHighlights />
    <TransactionsPreview />
    <WalletStatistics />
    <PaymentMethods />
    <AgentsNetwork />
    <LogoSlider />
    <Testimonials />
    <BlogUpdates />
    <FAQ />
    <NewsletterSignup />
  </main>
);

export default Home;

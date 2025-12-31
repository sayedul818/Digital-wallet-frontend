import { Link } from 'react-router-dom';
import { Wallet, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                PayWallet
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted digital wallet for secure and instant transactions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
              <a href="https://twitter.com/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></a>
              <a href="https://instagram.com/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
              <a href="https://linkedin.com/" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PayWallet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

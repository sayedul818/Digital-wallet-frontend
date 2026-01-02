import { Link } from 'react-router-dom';
import { Wallet, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Brand Section */}
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-white">
                PayWallet
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Connect with digital wallet users and explore secure transactions together.
            </p>
          </div>

          {/* Links Section with Horizontal Scroll */}
          <div className="mb-6">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-2">
              <div className="flex gap-8 min-w-max pr-4">
                <div>
                  <h3 className="font-semibold mb-3 text-white">Product</h3>
                  <ul className="space-y-2 whitespace-nowrap">
                    <li><Link to="/features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                    <li><Link to="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                    <li><Link to="/security" className="text-sm text-gray-400 hover:text-white transition-colors">Security</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-white">Company</h3>
                  <ul className="space-y-2 whitespace-nowrap">
                    <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                    <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                    <li><Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-white">Legal</h3>
                  <ul className="space-y-2 whitespace-nowrap">
                    <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} PayWallet. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <span className="text-white">
                  PayWallet
                </span>
              </Link>
              <p className="text-sm text-gray-400">
                Your trusted digital wallet for secure and instant transactions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/help" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/security" className="text-sm text-gray-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://facebook.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></a>
                <a href="https://twitter.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></a>
                <a href="https://instagram.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
                <a href="https://linkedin.com/" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} PayWallet. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

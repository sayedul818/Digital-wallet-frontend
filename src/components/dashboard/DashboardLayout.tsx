import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import {
  LayoutDashboard,
  Send,
  History,
  User as UserIcon,
  Wallet,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  DollarSign,
  Settings,
  ArrowDownLeft,
  ArrowUpRight,
  HandCoins,
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const userMenuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/user/dashboard' },
    { icon: Send, label: 'Send Money', path: '/user/send' },
    { icon: ArrowDownLeft, label: 'Deposit Money', path: '/user/deposit' },
    { icon: ArrowUpRight, label: 'Withdraw Money', path: '/user/withdraw' },
    { icon: History, label: 'Transactions', path: '/user/transactions' },
    { icon: UserIcon, label: 'Profile', path: '/user/profile' },
  ];

  const agentMenuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/agent/dashboard' },
    { icon: DollarSign, label: 'Cash In', path: '/agent/cash-in' },
    { icon: HandCoins, label: 'Requests', path: '/agent/requests' },
    { icon: History, label: 'Transactions', path: '/agent/transactions' },
    { icon: UserIcon, label: 'Profile', path: '/agent/profile' },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Users, label: 'Agents', path: '/admin/agents' },
    { icon: History, label: 'Transactions', path: '/admin/transactions' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: UserIcon, label: 'Profile', path: '/admin/profile' },
  ];

  const menuItems =
    user?.role === 'admin'
      ? adminMenuItems
      : user?.role === 'agent'
      ? agentMenuItems
      : userMenuItems;

  return (
    <div className="h-screen flex flex-col bg-muted/30">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">PayzaGo</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static top-0 left-0 z-40 h-screen w-64 bg-background border-r transition-transform lg:transition-none duration-300 overflow-hidden lg:overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-2 p-6 border-b flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  PayzaGo
                </h1>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-semibold">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t space-y-2 flex-shrink-0">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-4">Toggle Theme</span>
              </Button>
              <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 min-w-0">{children}</main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

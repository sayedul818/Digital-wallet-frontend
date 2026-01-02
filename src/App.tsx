import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from 'next-themes';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import SendMoney from "./pages/user/SendMoney";
import Deposit from "./pages/user/Deposit";
import Withdraw from "./pages/user/Withdraw";
import Transactions from "./pages/user/Transactions";
import Profile from "./pages/user/Profile";

// Agent Pages
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentTransactions from "./pages/agent/AgentTransactions";
import AgentRequests from "./pages/agent/AgentRequests";
import CashIn from "./pages/agent/CashIn";
import CashOut from "./pages/agent/CashOut";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                }
              />

              {/* User Routes */}
              <Route
                path="/user/*"
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="send" element={<SendMoney />} />
                        <Route path="deposit" element={<Deposit />} />
                        <Route path="withdraw" element={<Withdraw />} />
                        <Route path="transactions" element={<Transactions />} />
                        <Route path="profile" element={<Profile />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Agent Routes */}
              <Route
                path="/agent/*"
                element={
                  <ProtectedRoute allowedRoles={['agent']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="dashboard" element={<AgentDashboard />} />
                        <Route path="cash-in" element={<CashIn />} />
                        <Route path="cash-out" element={<CashOut />} />
                        <Route path="requests" element={<AgentRequests />} />
                        <Route path="transactions" element={<AgentTransactions />} />
                        <Route path="profile" element={<Profile />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout>
                      <Routes>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="agents" element={<UserManagement />} />
                        <Route path="transactions" element={<Transactions />} />
                        <Route path="settings" element={<div>Settings Page</div>} />
                        <Route path="profile" element={<Profile />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;

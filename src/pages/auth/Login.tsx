import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';
import { setCredentials } from '@/store/slices/authSlice';
import { useLoginMutation } from '@/store/api/walletApi';
import { RootState } from '@/store/store';
import type { UserRole } from '@/store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [loginApi, { isLoading: loginLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginApi({ email, password }).unwrap();
      // backend returns _id; map to id
      const userData = {
        id: (result._id || result.id) as string,
        name: result.name,
        email: result.email,
        phone: result.phone,
        role: result.role,
        balance: result.balance,
      };

      dispatch(
        setCredentials({
          user: userData,
          token: result.token,
        })
      );

      toast.success(`Welcome back, ${userData.name}!`);
      navigate(`/${userData.role}/dashboard`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Predefined credentials for demo
  const credentialSets = [
    {
      label: 'User Login',
      email: 'user@example.com',
      password: 'userpass123',
    },
    {
      label: 'Agent Login',
      email: 'agent@example.com',
      password: 'agentpass123',
    },
    {
      label: 'Admin Login',
      email: 'admin@example.com',
      password: 'admin123',
    },
  ];

  const handleAutoFill = (cred: { email: string; password: string }) => {
    setEmail(cred.email);
    setPassword(cred.password);
    toast.success('Credentials filled!');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center py-4 md:py-12 px-4 bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-md border-0 shadow-xl my-auto">
        <CardHeader className="space-y-3 md:space-y-4 py-4 md:py-6">
          <div className="flex justify-center">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Wallet className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-xl md:text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your PayzaGo account</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
          {/* Auto-credential section */}
          <div className="flex justify-center gap-2 mb-4 md:mb-6">
            {credentialSets.map((cred) => (
              <button
                key={cred.label}
                type="button"
                className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-200 font-medium text-xs md:text-sm shadow-sm hover:bg-blue-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                onClick={() => handleAutoFill(cred)}
              >
                {cred.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

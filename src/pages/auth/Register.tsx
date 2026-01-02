import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Wallet } from 'lucide-react';
import { setCredentials } from '@/store/slices/authSlice';
import { useRegisterMutation } from '@/store/api/walletApi';
import { RootState } from '@/store/store';
import type { UserRole } from '@/store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as UserRole,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);

  const [registerApi] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const result = await registerApi({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      }).unwrap();

      const userData = {
        id: (result._id || result.id) as string,
        name: result.name,
        email: result.email,
        phone: result.phone,
        role: result.role,
        balance: result.balance,
      };

      dispatch(setCredentials({ user: userData, token: result.token }));

      toast.success('Account created successfully!');
      navigate(`/${formData.role}/dashboard`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-screen flex items-center justify-center py-4 md:py-12 px-4 bg-white dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 overflow-y-auto">
      <Card className="w-full max-w-md border-0 shadow-xl my-auto">
        <CardHeader className="space-y-3 md:space-y-4 py-4 md:py-6">
          <div className="flex justify-center">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Wallet className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-xl md:text-2xl">Create Account</CardTitle>
            <CardDescription>Join PayzaGo today</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="font-normal cursor-pointer">
                    User - For personal transactions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="agent" id="agent" />
                  <Label htmlFor="agent" className="font-normal cursor-pointer">
                    Agent - For business/cash services
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

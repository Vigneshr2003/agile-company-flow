
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import ForgotPassword from './ForgotPassword';
import logo from './asset/logo.png';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onLogin({ email, password });
    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'super' | 'team') => {
    if (role === 'super') {
      setEmail('sathya@maxmoc.in');
      setPassword('Maxmoc@2025');
    } else {
      setEmail('admin@software.maxmoc.in');
      setPassword('Software@123');
    }
  };

  if (showForgotPassword) {
    return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="w-24 h-24 flex items-center justify-center mx-auto">
            <img src={logo} alt="Maxmoc" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in to Maxmoc Management System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo Credentials */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Demo Accounts</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('super')}
                className="flex-1 hover:bg-blue-50"
                disabled={isLoading}
              >
                Super Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('team')}
                className="flex-1 hover:bg-green-50"
                disabled={isLoading}
              >
                Team Admin
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Click "Create Super Admin Account" below to create the test account
            </p>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button
              variant="link"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </Button>
            
            <p className="text-sm text-gray-600">
              Don't have an account? You need to create the super admin account first.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

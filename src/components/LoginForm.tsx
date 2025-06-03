
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">M</span>
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
              >
                Super Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('team')}
                className="flex-1 hover:bg-green-50"
              >
                Team Admin
              </Button>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
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
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setShowForgotPassword(!showForgotPassword)}
              className="text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </Button>
          </div>

          {showForgotPassword && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <p className="text-sm text-blue-700">
                  Enter your email address and we'll send you a reset link via OTP.
                </p>
                <div className="flex gap-2 mt-3">
                  <Input placeholder="Enter email" className="flex-1" />
                  <Button size="sm" variant="outline">Send OTP</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Default Credentials Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="text-xs text-amber-800">
              <strong>Super Admin Default:</strong><br />
              Email: sathya@maxmoc.in<br />
              Password: Maxmoc@2025
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

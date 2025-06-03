
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CheckSquare, Package, Settings, Plus, Eye } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import SuperAdminDashboard from '@/components/SuperAdminDashboard';
import TeamAdminDashboard from '@/components/TeamAdminDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'super_admin' | 'team_admin'>('super_admin');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (credentials: any) => {
    // Mock login logic - in real app this would call backend
    if (credentials.email === 'sathya@maxmoc.in' && credentials.password === 'Maxmoc@2025') {
      setUserRole('super_admin');
      setCurrentUser({ name: 'Sathya', email: 'sathya@maxmoc.in', role: 'Super Admin' });
    } else {
      setUserRole('team_admin');
      setCurrentUser({ name: 'Team Admin', email: credentials.email, role: 'Team Admin' });
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Maxmoc Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {currentUser?.role}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt={currentUser?.name} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {currentUser?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {userRole === 'super_admin' ? (
          <SuperAdminDashboard currentUser={currentUser} />
        ) : (
          <TeamAdminDashboard currentUser={currentUser} />
        )}
      </main>
    </div>
  );
};

export default Index;

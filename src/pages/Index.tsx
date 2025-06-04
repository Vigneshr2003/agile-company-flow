
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/LoginForm';
import SuperAdminDashboard from '@/components/SuperAdminDashboard';
import TeamAdminDashboard from '@/components/TeamAdminDashboard';
import { authService } from '@/services/auth';
import { profilesService } from '@/services/profiles';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setIsLoggedIn(!!session);
        setCurrentUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            const { data: profile, error } = await profilesService.getCurrentProfile();
            if (error) {
              console.error('Error fetching profile:', error);
              toast({
                title: "Error",
                description: "Failed to load user profile",
                variant: "destructive"
              });
            } else {
              setUserProfile(profile);
            }
            setLoading(false);
          }, 0);
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    authService.getCurrentSession().then((session) => {
      setIsLoggedIn(!!session);
      setCurrentUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const { data, error } = await authService.signIn(credentials.email, credentials.password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await authService.signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Logged out successfully",
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
                {userProfile?.role?.replace('_', ' ') || 'Loading...'}
              </Badge>
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.profile_photo_url} alt={userProfile?.full_name} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {userProfile?.full_name?.charAt(0) || currentUser?.email?.charAt(0) || '?'}
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
        {userProfile?.role === 'super_admin' ? (
          <SuperAdminDashboard currentUser={currentUser} userProfile={userProfile} />
        ) : (
          <TeamAdminDashboard currentUser={currentUser} userProfile={userProfile} />
        )}
      </main>
    </div>
  );
};

export default Index;

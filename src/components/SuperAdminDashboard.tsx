
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CheckSquare, Package, Settings, Plus, Eye, Calendar, Activity, FileText } from 'lucide-react';
import TeamManagement from '@/components/TeamManagement';
import TaskManagement from '@/components/TaskManagement';
import StockManagement from '@/components/StockManagement';
import EmployeeOverview from '@/components/EmployeeOverview';
import MoMManagement from '@/components/MoMManagement';

interface SuperAdminDashboardProps {
  currentUser: any;
  userProfile: any;
}

const SuperAdminDashboard = ({ currentUser, userProfile }: SuperAdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalTeams: 5,
    totalEmployees: 42,
    pendingTasks: 18,
    stockRequests: 7,
    totalMoMs: 12
  };

  const recentActivity = [
    { id: 1, action: 'Task updated', team: 'Software Team', time: '2 min ago', type: 'task' },
    { id: 2, action: 'Stock request added', team: 'Hardware Team', time: '5 min ago', type: 'stock' },
    { id: 3, action: 'Employee added', team: 'Design Team', time: '10 min ago', type: 'employee' },
    { id: 4, action: 'MoM created', team: 'Production Team', time: '15 min ago', type: 'mom' },
  ];

  const teams = [
    { id: 1, name: 'Software Team', admin: 'John Doe', employees: 12, activeTasks: 8, status: 'active' },
    { id: 2, name: 'Production Team', admin: 'Jane Smith', employees: 15, activeTasks: 5, status: 'active' },
    { id: 3, name: 'Hardware & Assembly', admin: 'Mike Johnson', employees: 8, activeTasks: 3, status: 'active' },
    { id: 4, name: 'Design Team', admin: 'Sarah Wilson', employees: 6, activeTasks: 2, status: 'active' },
    { id: 5, name: 'Accounting Team', admin: 'David Brown', employees: 3, activeTasks: 1, status: 'active' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userProfile?.full_name || currentUser?.email}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your teams today.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Teams</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalTeams}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Employees</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Pending Tasks</p>
                <p className="text-2xl font-bold text-orange-900">{stats.pendingTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Stock Requests</p>
                <p className="text-2xl font-bold text-purple-900">{stats.stockRequests}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-600 text-sm font-medium">Meeting Records</p>
                <p className="text-2xl font-bold text-indigo-900">{stats.totalMoMs}</p>
              </div>
              <FileText className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Teams
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="stock" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Stock
          </TabsTrigger>
          <TabsTrigger value="employees" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Employees
          </TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Meetings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Teams Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Teams Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div>
                      <h4 className="font-medium text-gray-900">{team.name}</h4>
                      <p className="text-sm text-gray-600">{team.employees} employees • {team.activeTasks} active tasks</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'task' ? 'bg-blue-500' : 
                      activity.type === 'stock' ? 'bg-purple-500' : 
                      activity.type === 'mom' ? 'bg-indigo-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.team} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <TeamManagement />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="stock">
          <StockManagement />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeOverview />
        </TabsContent>

        <TabsContent value="meetings">
          <MoMManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;

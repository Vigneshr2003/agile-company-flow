
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, CheckSquare, Package, Plus, Calendar, Clock } from 'lucide-react';
import TeamEmployeeManagement from '@/components/TeamEmployeeManagement';
import TeamTaskView from '@/components/TeamTaskView';
import TeamStockView from '@/components/TeamStockView';

interface TeamAdminDashboardProps {
  currentUser: any;
}

const TeamAdminDashboard = ({ currentUser }: TeamAdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for team admin view
  const teamStats = {
    totalEmployees: 12,
    activeTasks: 8,
    completedTasks: 15,
    pendingStockRequests: 3
  };

  const myEmployees = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg', status: 'active' },
    { id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/placeholder.svg', status: 'active' },
    { id: 3, name: 'Carol Davis', role: 'UI/UX Designer', avatar: '/placeholder.svg', status: 'active' },
    { id: 4, name: 'David Wilson', role: 'QA Engineer', avatar: '/placeholder.svg', status: 'active' },
  ];

  const recentTasks = [
    { id: 1, title: 'Fix login bug', status: 'in_progress', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Update user interface', status: 'to_do', priority: 'medium', dueDate: '2024-01-18' },
    { id: 3, title: 'Database optimization', status: 'done', priority: 'low', dueDate: '2024-01-12' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Software Team Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your team and track progress</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">My Employees</p>
                <p className="text-2xl font-bold text-blue-900">{teamStats.totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Active Tasks</p>
                <p className="text-2xl font-bold text-orange-900">{teamStats.activeTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-900">{teamStats.completedTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Stock Requests</p>
                <p className="text-2xl font-bold text-purple-900">{teamStats.pendingStockRequests}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="employees" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Employees
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="stock" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            Stock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myEmployees.slice(0, 4).map((employee) => (
                  <div key={employee.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Employees
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                  Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            task.status === 'done' ? 'bg-green-50 text-green-700 border-green-200' :
                            task.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-orange-50 text-orange-700 border-orange-200'
                          }`}
                        >
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <TeamEmployeeManagement />
        </TabsContent>

        <TabsContent value="tasks">
          <TeamTaskView />
        </TabsContent>

        <TabsContent value="stock">
          <TeamStockView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamAdminDashboard;

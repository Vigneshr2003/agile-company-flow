
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Clock, CheckSquare } from 'lucide-react';

const TeamsOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');

  // Mock data for teams with their employees
  const teamsData = [
    {
      id: 1,
      name: 'Software Team',
      admin: { name: 'John Doe', email: 'john@software.maxmoc.in' },
      activeTasks: 8,
      employees: [
        { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg', status: 'active' },
        { id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/placeholder.svg', status: 'active' },
        { id: 3, name: 'Carol Davis', role: 'UI/UX Designer', avatar: '/placeholder.svg', status: 'active' },
        { id: 4, name: 'David Wilson', role: 'QA Engineer', avatar: '/placeholder.svg', status: 'active' },
      ]
    },
    {
      id: 2,
      name: 'Production Team',
      admin: { name: 'Jane Smith', email: 'jane@production.maxmoc.in' },
      activeTasks: 5,
      employees: [
        { id: 5, name: 'Emma Brown', role: 'Production Manager', avatar: '/placeholder.svg', status: 'active' },
        { id: 6, name: 'Frank Miller', role: 'Assembly Technician', avatar: '/placeholder.svg', status: 'active' },
        { id: 7, name: 'Grace Wilson', role: 'Quality Controller', avatar: '/placeholder.svg', status: 'active' },
      ]
    },
    {
      id: 3,
      name: 'Hardware & Assembly',
      admin: { name: 'Mike Johnson', email: 'mike@hardware.maxmoc.in' },
      activeTasks: 3,
      employees: [
        { id: 8, name: 'Henry Clark', role: 'Hardware Engineer', avatar: '/placeholder.svg', status: 'active' },
        { id: 9, name: 'Ivy Adams', role: 'PCB Designer', avatar: '/placeholder.svg', status: 'active' },
      ]
    },
    {
      id: 4,
      name: 'Design Team',
      admin: { name: 'Sarah Wilson', email: 'sarah@design.maxmoc.in' },
      activeTasks: 2,
      employees: [
        { id: 10, name: 'Jack Turner', role: 'Graphic Designer', avatar: '/placeholder.svg', status: 'active' },
        { id: 11, name: 'Kate Lewis', role: 'Brand Designer', avatar: '/placeholder.svg', status: 'active' },
      ]
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New team member added to Software Team', user: 'Alice Johnson', time: '2 hours ago', type: 'team' },
    { id: 2, action: 'Stock request approved for Production Team', user: 'Frank Miller', time: '4 hours ago', type: 'stock' },
    { id: 3, action: 'Task completed by Design Team', user: 'Jack Turner', time: '6 hours ago', type: 'task' },
    { id: 4, action: 'Meeting scheduled for Hardware Team', user: 'Henry Clark', time: '1 day ago', type: 'meeting' },
  ];

  const filteredTeams = teamsData.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.employees.some(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterTeam === 'all' || team.name === filterTeam;
    return matchesSearch && matchesFilter;
  });

  const getTeamColor = (teamName: string) => {
    const colors = {
      'Software Team': 'bg-blue-50 text-blue-700 border-blue-200',
      'Production Team': 'bg-green-50 text-green-700 border-green-200',
      'Hardware & Assembly': 'bg-purple-50 text-purple-700 border-purple-200',
      'Design Team': 'bg-pink-50 text-pink-700 border-pink-200',
    };
    return colors[teamName as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'team': return <Users className="h-4 w-4" />;
      case 'task': return <CheckSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalEmployees = teamsData.reduce((sum, team) => sum + team.employees.length, 0);
  const totalTasks = teamsData.reduce((sum, team) => sum + team.activeTasks, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teams Overview</h2>
          <p className="text-gray-600">View all teams and their members</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-blue-600 text-sm font-medium">Total Teams</p>
              <p className="text-2xl font-bold text-blue-900">{teamsData.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-green-900">{totalEmployees}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-purple-600 text-sm font-medium">Active Tasks</p>
              <p className="text-2xl font-bold text-purple-900">{totalTasks}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teams Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams or employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTeam} onValueChange={setFilterTeam}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teamsData.map((team) => (
                  <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Teams Grid */}
          <div className="space-y-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{team.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        Admin: {team.admin.name} • {team.employees.length} employees • {team.activeTasks} active tasks
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getTeamColor(team.name)}>
                      {team.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {team.employees.map((employee) => (
                      <div key={employee.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{employee.name}</h4>
                          <p className="text-xs text-gray-600">{employee.role}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          {employee.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-blue-600 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamsOverview;

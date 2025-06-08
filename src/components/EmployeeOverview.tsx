import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Mail, User } from 'lucide-react';

const EmployeeOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');

  const employees = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@software.maxmoc.in',
      role: 'Frontend Developer',
      team: 'Software Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@software.maxmoc.in',
      role: 'Backend Developer',
      team: 'Software Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@software.maxmoc.in',
      role: 'UI/UX Designer',
      team: 'Software Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-12',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@software.maxmoc.in',
      role: 'QA Engineer',
      team: 'Software Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-08',
      status: 'active'
    },
    {
      id: 5,
      name: 'Emma Brown',
      email: 'emma@production.maxmoc.in',
      role: 'Production Manager',
      team: 'Production Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-05',
      status: 'active'
    },
    {
      id: 6,
      name: 'Frank Miller',
      email: 'frank@production.maxmoc.in',
      role: 'Assembly Technician',
      team: 'Production Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-03',
      status: 'active'
    },
    {
      id: 7,
      name: 'Grace Lee',
      email: 'grace@design.maxmoc.in',
      role: 'Graphic Designer',
      team: 'Design Team',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-07',
      status: 'active'
    },
    {
      id: 8,
      name: 'Henry Clark',
      email: 'henry@hardware.maxmoc.in',
      role: 'Hardware Engineer',
      team: 'Hardware & Assembly',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-09',
      status: 'active'
    }
  ];

  const teams = ['Software Team', 'Production Team', 'Hardware & Assembly', 'Design Team', 'Accounting Team'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === 'all' || employee.team === filterTeam;
    return matchesSearch && matchesTeam;
  });

  const getTeamColor = (team: string) => {
    const colors = {
      'Software Team': 'bg-blue-50 text-blue-700 border-blue-200',
      'Production Team': 'bg-green-50 text-green-700 border-green-200',
      'Hardware & Assembly': 'bg-purple-50 text-purple-700 border-purple-200',
      'Design Team': 'bg-pink-50 text-pink-700 border-pink-200',
      'Accounting Team': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[team as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const teamStats = teams.map(team => ({
    name: team,
    count: employees.filter(emp => emp.team === team).length
  }));

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Employee Overview</h2>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">View all employees across teams</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 col-span-2 sm:col-span-1">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-blue-600 text-xs sm:text-sm font-medium">Total Employees</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{employees.length}</p>
            </div>
          </CardContent>
        </Card>
        {teamStats.map((team) => (
          <Card key={team.name} className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center">
                <p className="text-gray-600 text-xs font-medium truncate" title={team.name}>{team.name}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{team.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
        <div className="relative flex-1 max-w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterTeam} onValueChange={setFilterTeam}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>{team}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-sm sm:text-lg">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Employee Info */}
                <div className="space-y-1 sm:space-y-2 min-w-0 w-full">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words">{employee.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{employee.role}</p>
                  <Badge variant="outline" className={`${getTeamColor(employee.team)} text-xs`}>
                    {employee.team}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 w-full min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 justify-center">
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="truncate text-xs">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 justify-center">
                    <User className="h-3 w-3 shrink-0" />
                    <span className="text-xs">Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Status */}
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                  {employee.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-sm sm:text-base text-gray-600 text-center">
              {searchTerm || filterTeam !== 'all' 
                ? "No employees match your current filters." 
                : "No employees have been added yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeOverview;

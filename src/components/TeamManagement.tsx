import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Users, Briefcase, Mail, Phone, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TeamManagementProps {
  selectedTeam: string;
}

const TeamManagement = ({ selectedTeam }: TeamManagementProps) => {
  const [teams] = useState([
    {
      id: 'software',
      name: 'Software Team',
      description: 'Frontend and backend development',
      memberCount: 5,
      lead: 'Alice Johnson'
    },
    {
      id: 'production',
      name: 'Production Team',
      description: 'Manufacturing and quality control',
      memberCount: 8,
      lead: 'David Wilson'
    },
    {
      id: 'hardware',
      name: 'Hardware & Assembly',
      description: 'Hardware design and assembly',
      memberCount: 4,
      lead: 'Eva Brown'
    },
    {
      id: 'design',
      name: 'Design Team',
      description: 'UI/UX and graphic design',
      memberCount: 3,
      lead: 'Grace Lee'
    }
  ]);

  const [employees] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@maxmoc.in',
      role: 'Frontend Developer',
      team: 'Software Team',
      status: 'active',
      joinDate: '2023-06-15',
      phone: '+1 (555) 123-4567',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@maxmoc.in',
      role: 'Backend Developer',
      team: 'Software Team',
      status: 'active',
      joinDate: '2023-07-01',
      phone: '+1 (555) 234-5678',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@maxmoc.in',
      role: 'Full Stack Developer',
      team: 'Software Team',
      status: 'active',
      joinDate: '2023-08-15',
      phone: '+1 (555) 345-6789',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@maxmoc.in',
      role: 'Production Manager',
      team: 'Production Team',
      status: 'active',
      joinDate: '2023-05-01',
      phone: '+1 (555) 456-7890',
      avatar: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Eva Brown',
      email: 'eva@maxmoc.in',
      role: 'Assembly Specialist',
      team: 'Hardware & Assembly',
      status: 'active',
      joinDate: '2023-09-01',
      phone: '+1 (555) 567-8901',
      avatar: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Grace Lee',
      email: 'grace@maxmoc.in',
      role: 'UI/UX Designer',
      team: 'Design Team',
      status: 'active',
      joinDate: '2023-10-15',
      phone: '+1 (555) 678-9012',
      avatar: '/placeholder.svg'
    }
  ]);

  // Filter teams and employees based on selectedTeam
  const filteredTeams = selectedTeam === 'all' ? teams : teams.filter(team => team.name === selectedTeam);
  const filteredEmployees = selectedTeam === 'all' ? employees : employees.filter(emp => emp.team === selectedTeam);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">
            {selectedTeam === 'all' ? 'All Teams' : selectedTeam} - Manage teams and team members
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Users className="h-4 w-4 mr-2" />
            Add Team
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Teams Overview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Teams Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <p className="text-sm text-gray-600">{team.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Members:</span>
                    <span className="font-medium">{team.memberCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Team Lead:</span>
                    <span className="font-medium">{team.lead}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Employee List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                      <p className="text-sm text-gray-500">{employee.team}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{employee.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Team</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Remove Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No employees found for the selected team.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamManagement;

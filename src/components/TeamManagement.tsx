import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Users, Briefcase, Mail, Phone, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AddTeamForm from '@/components/AddTeamForm';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import { authService } from '@/services/auth';

interface TeamManagementProps {
  selectedTeam: string;
}

const TeamManagement = ({ selectedTeam }: TeamManagementProps) => {
  const [teams, setTeams] = useState([
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

  const [employees, setEmployees] = useState([
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

  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  // Fix filtering logic
  const filteredTeams = selectedTeam === 'all' ? teams : teams.filter(team => 
    team.name.toLowerCase() === selectedTeam.toLowerCase() || 
    team.id === selectedTeam
  );
  
  const filteredEmployees = selectedTeam === 'all' ? employees : employees.filter(emp => 
    emp.team.toLowerCase() === selectedTeam.toLowerCase() ||
    emp.team === selectedTeam
  );

  const handleAddTeam = async (teamData: any) => {
    try {
      // Create team admin credentials in the auth service
      await authService.createUser(
        teamData.adminEmail,
        teamData.adminPassword,
        {
          full_name: `${teamData.name} Admin`,
          role: 'team_admin'
        }
      );
      
      // Add team to local state
      const newTeam = {
        id: teamData.id,
        name: teamData.name,
        description: teamData.description,
        memberCount: teamData.memberCount,
        lead: teamData.lead
      };
      
      setTeams([...teams, newTeam]);
      console.log('New team created with admin credentials:', teamData);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleAddEmployee = (employeeData: any) => {
    setEmployees([...employees, employeeData]);
    console.log('New employee added:', employeeData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Team Management</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {selectedTeam === 'all' ? 'All Teams' : selectedTeam} - Manage teams and team members
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto text-xs sm:text-sm" 
              onClick={() => setShowAddTeam(true)}
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Team
            </Button>
            <Button 
              className="w-full sm:w-auto text-xs sm:text-sm" 
              onClick={() => setShowAddEmployee(true)}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Teams Overview */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Teams Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-sm sm:text-lg break-words">{team.name}</CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{team.description}</p>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Members:</span>
                      <span className="font-medium">{team.memberCount}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-500">Team Lead:</span>
                      <span className="font-medium text-right break-words flex-1 ml-2">{team.lead}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Manage Team
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Employee List */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Team Members</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                          {employee.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 break-words">{employee.role}</p>
                        <p className="text-xs sm:text-sm text-gray-500 break-words">{employee.team}</p>
                        <div className="flex flex-col gap-1 mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1 break-all">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="break-all">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className={`${getStatusColor(employee.status)} text-xs px-2 py-1`}>
                        {employee.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="text-xs sm:text-sm">Edit Employee</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">Change Team</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 text-xs sm:text-sm">
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
            <CardContent className="text-center py-6 sm:py-8">
              <p className="text-gray-500 text-sm sm:text-base">No employees found for the selected team.</p>
            </CardContent>
          </Card>
        )}

        {/* Add Forms */}
        <AddTeamForm
          isOpen={showAddTeam}
          onClose={() => setShowAddTeam(false)}
          onSubmit={handleAddTeam}
        />

        <AddEmployeeForm
          isOpen={showAddEmployee}
          onClose={() => setShowAddEmployee(false)}
          onSubmit={handleAddEmployee}
          teams={teams}
        />
      </div>
    </div>
  );
};

export default TeamManagement;

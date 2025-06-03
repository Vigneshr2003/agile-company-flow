
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Eye, Edit, Settings, Mail, Key } from 'lucide-react';

const TeamManagement = () => {
  const [teams, setTeams] = useState([
    { 
      id: 1, 
      name: 'Software Team', 
      admin: { name: 'John Doe', email: 'john@software.maxmoc.in' },
      employees: 12, 
      activeTasks: 8, 
      status: 'active',
      created: '2024-01-01'
    },
    { 
      id: 2, 
      name: 'Production Team', 
      admin: { name: 'Jane Smith', email: 'jane@production.maxmoc.in' },
      employees: 15, 
      activeTasks: 5, 
      status: 'active',
      created: '2024-01-02'
    },
    { 
      id: 3, 
      name: 'Hardware & Assembly', 
      admin: { name: 'Mike Johnson', email: 'mike@hardware.maxmoc.in' },
      employees: 8, 
      activeTasks: 3, 
      status: 'active',
      created: '2024-01-03'
    },
    { 
      id: 4, 
      name: 'Design Team', 
      admin: { name: 'Sarah Wilson', email: 'sarah@design.maxmoc.in' },
      employees: 6, 
      activeTasks: 2, 
      status: 'active',
      created: '2024-01-04'
    },
    { 
      id: 5, 
      name: 'Accounting Team', 
      admin: { name: 'David Brown', email: 'david@accounting.maxmoc.in' },
      employees: 3, 
      activeTasks: 1, 
      status: 'active',
      created: '2024-01-05'
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    adminName: '',
    adminEmail: '',
    password: ''
  });

  const generatePassword = () => {
    const password = `${newTeam.name.replace(/\s+/g, '')}@123`;
    setNewTeam({ ...newTeam, password });
  };

  const handleCreateTeam = () => {
    const team = {
      id: teams.length + 1,
      name: newTeam.name,
      admin: { name: newTeam.adminName, email: newTeam.adminEmail },
      employees: 0,
      activeTasks: 0,
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };
    setTeams([...teams, team]);
    setNewTeam({ name: '', adminName: '', adminEmail: '', password: '' });
    setIsCreateModalOpen(false);
  };

  const teamEmployees = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/placeholder.svg', email: 'bob@example.com' },
    { id: 3, name: 'Carol Davis', role: 'UI/UX Designer', avatar: '/placeholder.svg', email: 'carol@example.com' },
    { id: 4, name: 'David Wilson', role: 'QA Engineer', avatar: '/placeholder.svg', email: 'david@example.com' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600">Create and manage teams with their admin credentials</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Create a new team and assign an admin with login credentials
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  placeholder="e.g., Marketing Team"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  placeholder="e.g., John Doe"
                  value={newTeam.adminName}
                  onChange={(e) => setNewTeam({ ...newTeam, adminName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="e.g., john@marketing.maxmoc.in"
                  value={newTeam.adminEmail}
                  onChange={(e) => setNewTeam({ ...newTeam, adminEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type="text"
                    placeholder="Auto-generated or enter custom"
                    value={newTeam.password}
                    onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })}
                  />
                  <Button variant="outline" onClick={generatePassword}>
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{team.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1">
                    Created {new Date(team.created).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {team.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Admin Info */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {team.admin.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{team.admin.name}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {team.admin.email}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{team.employees}</p>
                  <p className="text-xs text-gray-600">Employees</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{team.activeTasks}</p>
                  <p className="text-xs text-gray-600">Active Tasks</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-blue-50"
                      onClick={() => setSelectedTeam(team)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{selectedTeam?.name} - Employees</DialogTitle>
                      <DialogDescription>
                        View all employees under this team
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {teamEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                            <p className="text-xs text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;

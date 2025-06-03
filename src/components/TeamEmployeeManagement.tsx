
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Mail, User, Upload, Edit, Trash } from 'lucide-react';

const TeamEmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@software.maxmoc.in',
      role: 'Frontend Developer',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@software.maxmoc.in',
      role: 'Backend Developer',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@software.maxmoc.in',
      role: 'UI/UX Designer',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-12',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@software.maxmoc.in',
      role: 'QA Engineer',
      avatar: '/placeholder.svg',
      joinDate: '2024-01-08',
      status: 'active'
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    avatar: ''
  });

  const handleCreateEmployee = () => {
    const employee = {
      id: employees.length + 1,
      ...newEmployee,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', email: '', role: '', avatar: '' });
    setIsCreateModalOpen(false);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server/cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEmployee({ ...newEmployee, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Employees</h2>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Add a new team member with their details and profile photo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={newEmployee.avatar} alt="Preview" />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {newEmployee.name ? newEmployee.name.split(' ').map(n => n[0]).join('') : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeName">Full Name</Label>
                <Input
                  id="employeeName"
                  placeholder="e.g., John Doe"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeEmail">Email</Label>
                <Input
                  id="employeeEmail"
                  type="email"
                  placeholder="e.g., john@software.maxmoc.in"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeRole">Role</Label>
                <Input
                  id="employeeRole"
                  placeholder="e.g., Frontend Developer"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEmployee}>Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Avatar */}
                <Avatar className="h-20 w-20">
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                  <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Employee Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                    <User className="h-4 w-4" />
                    <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Status */}
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {employee.status}
                </Badge>

                {/* Actions */}
                <div className="flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-blue-50"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {employees.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Start building your team by adding your first employee.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Employee
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Employee Dialog */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update employee information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.name} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {selectedEmployee.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="edit-avatar-upload"
                  />
                  <Label htmlFor="edit-avatar-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={selectedEmployee.name}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={selectedEmployee.email}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={selectedEmployee.role}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, role: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setEmployees(employees.map(emp => 
                  emp.id === selectedEmployee.id ? selectedEmployee : emp
                ));
                setSelectedEmployee(null);
              }}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeamEmployeeManagement;

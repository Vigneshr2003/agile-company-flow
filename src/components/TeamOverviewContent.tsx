
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, CheckSquare, Calendar } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface TeamOverviewContentProps {
  myEmployees: Employee[];
  recentTasks: Task[];
}

const TeamOverviewContent = ({ myEmployees, recentTasks }: TeamOverviewContentProps) => {
  return (
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
  );
};

export default TeamOverviewContent;

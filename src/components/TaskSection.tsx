
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';

interface TaskSectionProps {
  title: string;
  tasks: any[];
  bgColor: string;
  onViewTask: (task: any) => void;
  onEditTask: (task: any) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TaskSection = ({ 
  title, 
  tasks, 
  bgColor, 
  onViewTask, 
  onEditTask, 
  getStatusColor, 
  getPriorityColor 
}: TaskSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`${bgColor} px-2 py-1 rounded-full text-xs font-medium`}>
          {tasks.length}
        </span>
      </div>
      
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{task.team}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assignee:</span>
                    <span className="font-medium">{task.assignee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="font-medium">{task.dueDate}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onEditTask(task)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onViewTask(task)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No {title.toLowerCase()} found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskSection;

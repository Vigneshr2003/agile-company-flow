
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MessageSquare, Flag } from 'lucide-react';

interface TaskCardProps {
  task: any;
  onStatusUpdate: (id: number, newStatus: string) => void;
  onViewDetails: (task: any) => void;
}

const TaskCard = ({ task, onStatusUpdate, onViewDetails }: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'to_do': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'done': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">{task.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 break-words">{task.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="break-all">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="break-all">Assigned: {new Date(task.assignedDate).toLocaleDateString()}</span>
              </div>
              {task.comments.length > 0 && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge variant="outline" className={`${getStatusColor(task.status)} text-xs whitespace-nowrap`}>
                {task.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs whitespace-nowrap`}>
                <Flag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {task.priority}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full lg:w-auto lg:min-w-[160px] shrink-0">
            <Select 
              value={task.status} 
              onValueChange={(value) => onStatusUpdate(task.id, value)}
            >
              <SelectTrigger className="w-full text-xs sm:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="to_do">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              className="w-full text-xs sm:text-sm"
              onClick={() => onViewDetails(task)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

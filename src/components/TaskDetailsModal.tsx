
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface TaskDetailsModalProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TaskDetailsModal = ({ 
  task, 
  isOpen, 
  onClose, 
  getStatusColor, 
  getPriorityColor 
}: TaskDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">{task?.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Status</h4>
              <Badge className={getStatusColor(task?.status || '')}>
                {task?.status}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium">Priority</h4>
              <Badge className={getPriorityColor(task?.priority || '')}>
                {task?.priority}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium">Assignee</h4>
              <p>{task?.assignee}</p>
            </div>
            <div>
              <h4 className="font-medium">Team</h4>
              <p>{task?.team}</p>
            </div>
            <div>
              <h4 className="font-medium">Due Date</h4>
              <p>{task?.dueDate}</p>
            </div>
            <div>
              <h4 className="font-medium">Created</h4>
              <p>{task?.createdAt}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;

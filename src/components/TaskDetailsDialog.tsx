
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Flag, Plus } from 'lucide-react';

interface TaskDetailsDialogProps {
  task: any;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (taskId: number, comment: string) => void;
}

const TaskDetailsDialog = ({ task, isOpen, onClose, onAddComment }: TaskDetailsDialogProps) => {
  const [newComment, setNewComment] = useState('');

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

  const handleAddComment = () => {
    if (newComment.trim() && task) {
      onAddComment(task.id, newComment);
      setNewComment('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg break-words pr-6">{task?.title}</DialogTitle>
          <DialogDescription className="text-sm">
            Task details and comments
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 sm:space-y-6 py-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Description</h4>
            <p className="text-gray-600 text-sm sm:text-base break-words">{task?.description}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Status</h4>
              <Badge variant="outline" className={`${getStatusColor(task?.status || '')} text-xs`}>
                {task?.status?.replace('_', ' ')}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Priority</h4>
              <Badge variant="outline" className={`${getPriorityColor(task?.priority || '')} text-xs`}>
                <Flag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {task?.priority}
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Comments</h4>
            <div className="space-y-3 max-h-32 sm:max-h-40 overflow-y-auto">
              {task?.comments?.map((comment: any) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-800 mb-1 text-sm break-words">{comment.text}</p>
                  <p className="text-xs text-gray-500">
                    {comment.author} • {new Date(comment.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {task?.comments?.length === 0 && (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>
            
            <div className="mt-4">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2 text-sm"
              />
              <Button 
                size="sm" 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="text-xs sm:text-sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;

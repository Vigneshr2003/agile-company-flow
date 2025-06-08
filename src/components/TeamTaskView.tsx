
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, Calendar, Clock, User, Flag, MessageSquare, Plus } from 'lucide-react';

const TeamTaskView = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Add login and registration functionality',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-10',
      comments: [
        { id: 1, text: 'Started working on the backend API', date: '2024-01-11', author: 'Alice Johnson' },
        { id: 2, text: 'Frontend components are ready', date: '2024-01-12', author: 'Bob Smith' }
      ]
    },
    {
      id: 2,
      title: 'Update user interface design',
      description: 'Modernize the dashboard layout',
      status: 'to_do',
      priority: 'medium',
      dueDate: '2024-01-25',
      assignedDate: '2024-01-12',
      comments: []
    },
    {
      id: 3,
      title: 'Fix responsive layout issues',
      description: 'Ensure mobile compatibility',
      status: 'done',
      priority: 'low',
      dueDate: '2024-01-15',
      assignedDate: '2024-01-08',
      comments: [
        { id: 1, text: 'All responsive issues have been resolved', date: '2024-01-14', author: 'Carol Davis' }
      ]
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [newComment, setNewComment] = useState('');

  const updateTaskStatus = (id: number, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const addComment = (taskId: number, comment: string) => {
    if (!comment.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      text: comment,
      date: new Date().toISOString().split('T')[0],
      author: 'Current User'
    };

    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, comments: [...task.comments, newCommentObj] }
        : task
    ));
    setNewComment('');
  };

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
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">My Tasks</h2>
          <p className="text-sm sm:text-base text-gray-600 break-words">View and update tasks assigned to your team</p>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 shrink-0">
          {tasks.filter(t => t.status === 'done').length} of {tasks.length} completed
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-orange-600 text-xs sm:text-sm font-medium">To Do</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-900">
                {tasks.filter(t => t.status === 'to_do').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-blue-600 text-xs sm:text-sm font-medium">In Progress</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center">
              <p className="text-green-600 text-xs sm:text-sm font-medium">Completed</p>
              <p className="text-xl sm:text-2xl font-bold text-green-900">
                {tasks.filter(t => t.status === 'done').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-3 sm:space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
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
                    onValueChange={(value) => updateTaskStatus(task.id, value)}
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full text-xs sm:text-sm"
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg break-words pr-6">{selectedTask?.title}</DialogTitle>
                        <DialogDescription className="text-sm">
                          Task details and comments
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 sm:space-y-6 py-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Description</h4>
                          <p className="text-gray-600 text-sm sm:text-base break-words">{selectedTask?.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Status</h4>
                            <Badge variant="outline" className={`${getStatusColor(selectedTask?.status || '')} text-xs`}>
                              {selectedTask?.status?.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Priority</h4>
                            <Badge variant="outline" className={`${getPriorityColor(selectedTask?.priority || '')} text-xs`}>
                              {selectedTask?.priority}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Comments</h4>
                          <div className="space-y-3 max-h-32 sm:max-h-40 overflow-y-auto">
                            {selectedTask?.comments?.map((comment: any) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-800 mb-1 text-sm break-words">{comment.text}</p>
                                <p className="text-xs text-gray-500">
                                  {comment.author} • {new Date(comment.date).toLocaleDateString()}
                                </p>
                              </div>
                            ))}
                            {selectedTask?.comments?.length === 0 && (
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
                              onClick={() => addComment(selectedTask?.id, newComment)}
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <CheckSquare className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks assigned</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base break-words">
              You don't have any tasks assigned yet. Check back later or contact your admin.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamTaskView;

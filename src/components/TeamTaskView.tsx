
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-gray-600">View and update tasks assigned to your team</p>
        </div>
        <div className="text-sm text-gray-500">
          {tasks.filter(t => t.status === 'done').length} of {tasks.length} completed
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-orange-600 text-sm font-medium">To Do</p>
              <p className="text-2xl font-bold text-orange-900">
                {tasks.filter(t => t.status === 'to_do').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-blue-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-blue-900">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-900">
                {tasks.filter(t => t.status === 'done').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                      <p className="text-gray-600 mb-4">{task.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Assigned: {new Date(task.assignedDate).toLocaleDateString()}</span>
                        </div>
                        {task.comments.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MessageSquare className="h-4 w-4" />
                            <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          <Flag className="h-3 w-3 mr-1" />
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Select 
                    value={task.status} 
                    onValueChange={(value) => updateTaskStatus(task.id, value)}
                  >
                    <SelectTrigger className="w-40">
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
                        onClick={() => setSelectedTask(task)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{selectedTask?.title}</DialogTitle>
                        <DialogDescription>
                          Task details and comments
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-600">{selectedTask?.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Status</h4>
                            <Badge variant="outline" className={getStatusColor(selectedTask?.status || '')}>
                              {selectedTask?.status?.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">Priority</h4>
                            <Badge variant="outline" className={getPriorityColor(selectedTask?.priority || '')}>
                              {selectedTask?.priority}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Comments</h4>
                          <div className="space-y-3 max-h-40 overflow-y-auto">
                            {selectedTask?.comments?.map((comment: any) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-800 mb-1">{comment.text}</p>
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
                              className="mb-2"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => addComment(selectedTask?.id, newComment)}
                              disabled={!newComment.trim()}
                            >
                              <Plus className="h-4 w-4 mr-1" />
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
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks assigned</h3>
            <p className="text-gray-600 text-center">
              You don't have any tasks assigned yet. Check back later or contact your admin.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamTaskView;

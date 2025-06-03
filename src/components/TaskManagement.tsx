
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare, Plus, Calendar, Clock, User, Flag, MessageSquare } from 'lucide-react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Add login and registration functionality',
      assignedTo: 'Software Team',
      assignee: 'John Doe',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-20',
      createdDate: '2024-01-10',
      comments: 2
    },
    {
      id: 2,
      title: 'Update production line efficiency',
      description: 'Optimize assembly line processes',
      assignedTo: 'Production Team',
      assignee: 'Jane Smith',
      status: 'to_do',
      priority: 'medium',
      dueDate: '2024-01-25',
      createdDate: '2024-01-12',
      comments: 0
    },
    {
      id: 3,
      title: 'Design new product mockups',
      description: 'Create wireframes for upcoming product launch',
      assignedTo: 'Design Team',
      assignee: 'Sarah Wilson',
      status: 'done',
      priority: 'low',
      dueDate: '2024-01-15',
      createdDate: '2024-01-08',
      comments: 5
    },
    {
      id: 4,
      title: 'Hardware component testing',
      description: 'Test new circuit boards for reliability',
      assignedTo: 'Hardware & Assembly',
      assignee: 'Mike Johnson',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-18',
      createdDate: '2024-01-11',
      comments: 1
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: ''
  });

  const teams = ['Software Team', 'Production Team', 'Hardware & Assembly', 'Design Team', 'Accounting Team'];

  const handleCreateTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      assignee: 'Team Admin',
      status: 'to_do',
      createdDate: new Date().toISOString().split('T')[0],
      comments: 0
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', assignedTo: '', priority: 'medium', dueDate: '' });
    setIsCreateModalOpen(false);
  };

  const filteredTasks = filterStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus);

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
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="text-gray-600">Assign and track tasks across all teams</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Assign Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Assign New Task</DialogTitle>
              <DialogDescription>
                Create and assign a task to a team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="taskTitle">Task Title</Label>
                <Input
                  id="taskTitle"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskDescription">Description</Label>
                <Textarea
                  id="taskDescription"
                  placeholder="Describe the task in detail"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Assign To Team</Label>
                  <Select 
                    value={newTask.assignedTo} 
                    onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team} value={team}>{team}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={newTask.priority} 
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Assign Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="to_do">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="done">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {task.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {task.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Assignment Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{task.assignedTo}</span>
              </div>

              {/* Status and Dates */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>

              {/* Comments */}
              {task.comments > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageSquare className="h-4 w-4" />
                  <span>{task.comments} comment{task.comments !== 1 ? 's' : ''}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedTask(task)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>{selectedTask?.title}</DialogTitle>
                      <DialogDescription>
                        Task assigned to {selectedTask?.assignedTo}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Created</h4>
                          <p className="text-gray-600">{selectedTask?.createdDate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Due Date</h4>
                          <p className="text-gray-600">{selectedTask?.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 text-center mb-4">
              {filterStatus === 'all' 
                ? "There are no tasks yet. Create your first task to get started." 
                : `No tasks with status "${filterStatus.replace('_', ' ')}" found.`}
            </p>
            {filterStatus === 'all' && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Task
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskManagement;

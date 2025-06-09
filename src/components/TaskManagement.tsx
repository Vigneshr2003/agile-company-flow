
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, Eye, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AddTaskForm from '@/components/AddTaskForm';

interface TaskManagementProps {
  selectedTeam: string;
}

const TaskManagement = ({ selectedTeam }: TaskManagementProps) => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Fix login authentication bug', 
      description: 'Users unable to login with Google OAuth',
      status: 'pending', 
      priority: 'high', 
      assignee: 'Alice Johnson',
      team: 'Software Team',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    { 
      id: 2, 
      title: 'Update product catalog UI', 
      description: 'Redesign the product listing page for better UX',
      status: 'approved', 
      priority: 'medium', 
      assignee: 'Bob Smith',
      team: 'Design Team',
      dueDate: '2024-01-18',
      createdAt: '2024-01-12'
    },
    { 
      id: 3, 
      title: 'Database performance optimization', 
      description: 'Optimize slow queries and add indexes',
      status: 'rejected', 
      priority: 'low', 
      assignee: 'Carol Davis',
      team: 'Software Team',
      dueDate: '2024-01-12',
      createdAt: '2024-01-08'
    },
    { 
      id: 4, 
      title: 'Assembly line efficiency improvement', 
      description: 'Implement new workflow for better productivity',
      status: 'approved', 
      priority: 'high', 
      assignee: 'David Wilson',
      team: 'Production Team',
      dueDate: '2024-01-20',
      createdAt: '2024-01-14'
    },
    { 
      id: 5, 
      title: 'Hardware testing protocols', 
      description: 'Develop comprehensive testing procedures',
      status: 'pending', 
      priority: 'medium', 
      assignee: 'Eva Brown',
      team: 'Hardware & Assembly',
      dueDate: '2024-01-25',
      createdAt: '2024-01-15'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  // Fix filtering logic - improve team matching
  const filteredTasks = tasks.filter(task => {
    const matchesTeam = selectedTeam === 'all' || 
                       task.team.toLowerCase() === selectedTeam.toLowerCase() ||
                       task.team === selectedTeam;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTeam && matchesStatus && matchesPriority && matchesSearch;
  });

  // Organize tasks by status
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const approvedTasks = filteredTasks.filter(task => task.status === 'approved');
  const rejectedTasks = filteredTasks.filter(task => task.status === 'rejected');

  const handleAddTask = (taskData: any) => {
    setTasks([...tasks, taskData]);
    console.log('New task added:', taskData);
  };

  const handleViewTask = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setShowEditTask(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TaskSection = ({ title, tasks: sectionTasks, bgColor }: { title: string; tasks: any[]; bgColor: string }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className={`${bgColor} px-2 py-1 rounded-full text-xs font-medium`}>
          {sectionTasks.length}
        </span>
      </div>
      
      {sectionTasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sectionTasks.map((task) => (
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
                    onClick={() => handleEditTask(task)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewTask(task)}
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
          <p className="text-gray-600">
            {selectedTeam === 'all' ? 'All Teams' : selectedTeam} - Track and manage tasks across your organization
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setShowAddTask(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilterStatus('all');
                setFilterPriority('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Sections */}
      <div className="space-y-8">
        <TaskSection 
          title="Pending Tasks" 
          tasks={pendingTasks} 
          bgColor="bg-yellow-100 text-yellow-800" 
        />
        <TaskSection 
          title="Approved Tasks" 
          tasks={approvedTasks} 
          bgColor="bg-green-100 text-green-800" 
        />
        <TaskSection 
          title="Rejected Tasks" 
          tasks={rejectedTasks} 
          bgColor="bg-red-100 text-red-800" 
        />
      </div>

      {/* Task Details Dialog */}
      <Dialog open={showTaskDetails} onOpenChange={setShowTaskDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">{selectedTask?.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Status</h4>
                <Badge className={getStatusColor(selectedTask?.status || '')}>
                  {selectedTask?.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium">Priority</h4>
                <Badge className={getPriorityColor(selectedTask?.priority || '')}>
                  {selectedTask?.priority}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium">Assignee</h4>
                <p>{selectedTask?.assignee}</p>
              </div>
              <div>
                <h4 className="font-medium">Team</h4>
                <p>{selectedTask?.team}</p>
              </div>
              <div>
                <h4 className="font-medium">Due Date</h4>
                <p>{selectedTask?.dueDate}</p>
              </div>
              <div>
                <h4 className="font-medium">Created</h4>
                <p>{selectedTask?.createdAt}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Task Form */}
      <AddTaskForm
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default TaskManagement;

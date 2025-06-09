
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddTaskForm from '@/components/AddTaskForm';
import TaskFilters from '@/components/TaskFilters';
import TaskSection from '@/components/TaskSection';
import TaskDetailsModal from '@/components/TaskDetailsModal';

interface TaskManagementProps {
  selectedTeam: string;
}

const TaskManagement = ({ selectedTeam }: TaskManagementProps) => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Fix login authentication bug', 
      description: 'Users unable to login with Google OAuth',
      status: 'InProgress', 
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
      status: 'ToDo', 
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
      status: 'Done', 
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
      status: 'ToDo', 
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
      status: 'Done', 
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
  const inProgress = filteredTasks.filter(task => task.status === 'InProgress');
  const toDo = filteredTasks.filter(task => task.status === 'ToDo');
  const done = filteredTasks.filter(task => task.status === 'Done');

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

  const handleClearFilters = () => {
    setFilterStatus('all');
    setFilterPriority('all');
    setSearchTerm('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'InProgress': return 'bg-green-100 text-green-800';
      case 'ToDo': return 'bg-yellow-100 text-yellow-800';
      case 'Done': return 'bg-red-100 text-red-800';
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
      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        onClearFilters={handleClearFilters}
      />

      {/* Task Sections */}
      <div className="space-y-8">
        <TaskSection 
          title="In Progress" 
          tasks={inProgress} 
          bgColor="bg-yellow-100 text-yellow-800"
          onViewTask={handleViewTask}
          onEditTask={handleEditTask}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
        <TaskSection 
          title="To-Do" 
          tasks={toDo} 
          bgColor="bg-green-100 text-green-800"
          onViewTask={handleViewTask}
          onEditTask={handleEditTask}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
        <TaskSection 
          title="Done" 
          tasks={done} 
          bgColor="bg-red-100 text-red-800"
          onViewTask={handleViewTask}
          onEditTask={handleEditTask}
          getStatusColor={getStatusColor}
          getPriorityColor={getPriorityColor}
        />
      </div>

      {/* Task Details Dialog */}
      <TaskDetailsModal
        task={selectedTask}
        isOpen={showTaskDetails}
        onClose={() => setShowTaskDetails(false)}
        getStatusColor={getStatusColor}
        getPriorityColor={getPriorityColor}
      />

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

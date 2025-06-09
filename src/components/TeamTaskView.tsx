
import { useState } from 'react';
import TaskStatsCards from '@/components/TaskStatsCards';
import TaskCard from '@/components/TaskCard';
import TaskDetailsDialog from '@/components/TaskDetailsDialog';
import EmptyTaskState from '@/components/EmptyTaskState';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Order tasks: In Progress -> To Do -> Done
  const orderedTasks = [
    ...tasks.filter(task => task.status === 'in_progress'),
    ...tasks.filter(task => task.status === 'to_do'),
    ...tasks.filter(task => task.status === 'done')
  ];

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
  };

  const handleViewDetails = (task: any) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
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
          {orderedTasks.filter(t => t.status === 'done').length} of {orderedTasks.length} completed
        </div>
      </div>

      {/* Quick Stats */}
      <TaskStatsCards tasks={orderedTasks} />

      {/* Tasks List */}
      <div className="space-y-3 sm:space-y-4">
        {orderedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusUpdate={updateTaskStatus}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {tasks.length === 0 && <EmptyTaskState />}

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        task={selectedTask}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAddComment={addComment}
      />
    </div>
  );
};

export default TeamTaskView;

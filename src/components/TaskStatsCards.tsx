
import { Card, CardContent } from '@/components/ui/card';

interface TaskStatsCardsProps {
  tasks: any[];
}

const TaskStatsCards = ({ tasks }: TaskStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
  );
};

export default TaskStatsCards;

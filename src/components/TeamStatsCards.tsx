
import { Card, CardContent } from '@/components/ui/card';
import { Users, CheckSquare, Package } from 'lucide-react';

interface TeamStatsCardsProps {
  teamStats: {
    totalEmployees: number;
    activeTasks: number;
    completedTasks: number;
    pendingStockRequests: number;
  };
}

const TeamStatsCards = ({ teamStats }: TeamStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">My Employees</p>
              <p className="text-2xl font-bold text-blue-900">{teamStats.totalEmployees}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Active Tasks</p>
              <p className="text-2xl font-bold text-orange-900">{teamStats.activeTasks}</p>
            </div>
            <CheckSquare className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-900">{teamStats.completedTasks}</p>
            </div>
            <CheckSquare className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Stock Requests</p>
              <p className="text-2xl font-bold text-purple-900">{teamStats.pendingStockRequests}</p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamStatsCards;


import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamEmployeeManagement from '@/components/TeamEmployeeManagement';
import TeamTaskView from '@/components/TeamTaskView';
import TeamStockView from '@/components/TeamStockView';
import TeamStatsCards from '@/components/TeamStatsCards';
import TeamOverviewContent from '@/components/TeamOverviewContent';
import MoMManagement from '@/components/MoMManagement';

interface TeamAdminDashboardProps {
  currentUser: any;
  userProfile: any;
}

const TeamAdminDashboard = ({ currentUser, userProfile }: TeamAdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for team admin view
  const teamStats = {
    totalEmployees: 12,
    activeTasks: 8,
    completedTasks: 15,
    pendingStockRequests: 3,
    totalMoMs: 5
  };

  const myEmployees = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: '/placeholder.svg', status: 'active' },
    { id: 2, name: 'Bob Smith', role: 'Backend Developer', avatar: '/placeholder.svg', status: 'active' },
    { id: 3, name: 'Carol Davis', role: 'UI/UX Designer', avatar: '/placeholder.svg', status: 'active' },
    { id: 4, name: 'David Wilson', role: 'QA Engineer', avatar: '/placeholder.svg', status: 'active' },
  ];

  const recentTasks = [
    { id: 1, title: 'Fix login bug', status: 'in_progress', priority: 'high', dueDate: '2024-01-15' },
    { id: 2, title: 'Update user interface', status: 'to_do', priority: 'medium', dueDate: '2024-01-18' },
    { id: 3, title: 'Database optimization', status: 'done', priority: 'low', dueDate: '2024-01-12' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Team Admin Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">Manage your team and track progress</p>
          <p className="text-sm text-green-600 mt-1">Frontend Demo - No Backend Integration</p>
        </div>
      </div>

      {/* Stats Overview */}
      <TeamStatsCards teamStats={teamStats} />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border shadow-sm min-w-max">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Employees
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Stock
            </TabsTrigger>
            <TabsTrigger value="meetings" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs md:text-sm">
              Meetings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <TeamOverviewContent myEmployees={myEmployees} recentTasks={recentTasks} />
        </TabsContent>

        <TabsContent value="employees">
          <TeamEmployeeManagement />
        </TabsContent>

        <TabsContent value="tasks">
          <TeamTaskView />
        </TabsContent>

        <TabsContent value="stock">
          <TeamStockView />
        </TabsContent>

        <TabsContent value="meetings">
          <MoMManagement selectedTeam="all" isAdmin={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamAdminDashboard;


import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TeamManagement from '@/components/TeamManagement';
import TeamsOverview from '@/components/TeamsOverview';
import TaskManagement from '@/components/TaskManagement';
import StockManagement from '@/components/StockManagement';
import MoMManagement from '@/components/MoMManagement';
import AdminPasswordManager from '@/components/AdminPasswordManager';

interface SuperAdminDashboardProps {
  currentUser: any;
  userProfile: any;
}

const SuperAdminDashboard = ({ currentUser, userProfile }: SuperAdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTeam, setSelectedTeam] = useState('all');
  
  // Updated teams to match the data structure used in components
  const [teams, setTeams] = useState([
    { id: 'all', name: 'All Teams' },
    { id: 'Software Team', name: 'Software Team' },
    { id: 'Production Team', name: 'Production Team' },
    { id: 'Hardware & Assembly', name: 'Hardware & Assembly' },
    { id: 'Design Team', name: 'Design Team' },
  ]);

  const handleTeamsUpdate = (updatedTeams: any[]) => {
    const formattedTeams = [
      { id: 'all', name: 'All Teams' },
      ...updatedTeams.map(team => ({ id: team.name, name: team.name }))
    ];
    setTeams(formattedTeams);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-2 sm:px-4 lg:px-8 py-3 sm:py-6 lg:py-8 space-y-3 sm:space-y-6 lg:space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col space-y-3 lg:flex-row lg:justify-between lg:items-center lg:space-y-0 gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 break-words">
              Super Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">
              Complete system overview and management
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Frontend Demo - No Backend Integration
            </p>
          </div>
          
          {/* Team Filter - Only show on relevant tabs */}
          {['teams', 'tasks', 'stock', 'meetings'].includes(activeTab) && (
            <div className="w-full lg:w-auto lg:min-w-48">
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-3 sm:space-y-6">
          <div className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid grid-cols-6 bg-white border shadow-sm w-full min-w-fit">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="teams" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Teams
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="stock" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Stock
                </TabsTrigger>
                <TabsTrigger 
                  value="meetings" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Meetings
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs px-1 sm:px-2 lg:px-4 py-2 whitespace-nowrap"
                >
                  Admin
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div className="w-full min-w-0">
            <TabsContent value="overview" className="mt-0">
              <TeamsOverview />
            </TabsContent>

            <TabsContent value="teams" className="mt-0">
              <TeamManagement selectedTeam={selectedTeam} onTeamsUpdate={handleTeamsUpdate} />
            </TabsContent>

            <TabsContent value="tasks" className="mt-0">
              <TaskManagement selectedTeam={selectedTeam} />
            </TabsContent>

            <TabsContent value="stock" className="mt-0">
              <StockManagement selectedTeam={selectedTeam} />
            </TabsContent>

            <TabsContent value="meetings" className="mt-0">
              <MoMManagement selectedTeam={selectedTeam} isAdmin={true} />
            </TabsContent>

            <TabsContent value="admin" className="mt-0">
              <AdminPasswordManager currentUser={currentUser} userProfile={userProfile} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

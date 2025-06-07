
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
  const teams = [
    { id: 'all', name: 'All Teams' },
    { id: 'Software Team', name: 'Software Team' },
    { id: 'Production Team', name: 'Production Team' },
    { id: 'Hardware & Assembly', name: 'Hardware & Assembly' },
    { id: 'Design Team', name: 'Design Team' },
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
              Super Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
              Complete system overview and management
            </p>
            <p className="text-xs sm:text-sm text-blue-600 mt-1">
              Frontend Demo - No Backend Integration
            </p>
          </div>
          
          {/* Team Filter - Only show on relevant tabs */}
          {['teams', 'tasks', 'stock', 'meetings'].includes(activeTab) && (
            <div className="w-full lg:w-auto min-w-0">
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-full sm:w-48 min-w-0">
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4 sm:space-y-6">
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 bg-white border shadow-sm min-w-max">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Teams
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="stock" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Stock
              </TabsTrigger>
              <TabsTrigger 
                value="meetings" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Meetings
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 sm:px-4 py-2"
              >
                Admin
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full min-w-0">
            <TabsContent value="overview" className="mt-0">
              <TeamsOverview />
            </TabsContent>

            <TabsContent value="teams" className="mt-0">
              <TeamManagement selectedTeam={selectedTeam} />
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


import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete system overview and management</p>
          <p className="text-sm text-blue-600 mt-1">Frontend Demo - No Backend Integration</p>
        </div>
        
        {/* Team Filter - Only show on relevant tabs */}
        {['teams', 'tasks', 'stock', 'meetings'].includes(activeTab) && (
          <div className="w-full sm:w-auto">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-full sm:w-48">
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white border shadow-sm min-w-max">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Teams
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Stock
            </TabsTrigger>
            <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Meetings
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs md:text-sm">
              Admin
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <TeamsOverview />
        </TabsContent>

        <TabsContent value="teams">
          <TeamManagement selectedTeam={selectedTeam} />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagement selectedTeam={selectedTeam} />
        </TabsContent>

        <TabsContent value="stock">
          <StockManagement selectedTeam={selectedTeam} />
        </TabsContent>

        <TabsContent value="meetings">
          <MoMManagement selectedTeam={selectedTeam} isAdmin={true} />
        </TabsContent>

        <TabsContent value="admin">
          <AdminPasswordManager currentUser={currentUser} userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;


import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamManagement from '@/components/TeamManagement';
import EmployeeOverview from '@/components/EmployeeOverview';
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete system overview and management</p>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Teams
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="stock" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Stock
          </TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Meetings
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <EmployeeOverview />
        </TabsContent>

        <TabsContent value="teams">
          <TeamManagement />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskManagement />
        </TabsContent>

        <TabsContent value="stock">
          <StockManagement />
        </TabsContent>

        <TabsContent value="meetings">
          <MoMManagement />
        </TabsContent>

        <TabsContent value="admin">
          <AdminPasswordManager currentUser={currentUser} userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;

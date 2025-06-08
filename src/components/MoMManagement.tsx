
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MoMForm from '@/components/MoMForm';
import MeetingCard from '@/components/MeetingCard';
import { MinutesOfMeeting } from '@/types/minutesOfMeeting';
import { teams, employees, mockMeetings } from '@/components/mockData';

interface MoMManagementProps {
  selectedTeam: string;
  isAdmin: boolean;
}

const MoMManagement = ({ selectedTeam, isAdmin }: MoMManagementProps) => {
  const [meetings] = useState(mockMeetings);
  const [showMoMForm, setShowMoMForm] = useState(false);

  // Fix filtering logic - improve team matching
  const filteredMeetings = meetings.filter(meeting => 
    selectedTeam === 'all' || 
    meeting.team.toLowerCase() === selectedTeam.toLowerCase() ||
    meeting.team === selectedTeam
  );

  // Sort meetings: scheduled first, then completed
  const scheduledMeetings = filteredMeetings
    .filter(meeting => meeting.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const completedMeetings = filteredMeetings
    .filter(meeting => meeting.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleMoMSubmit = (mom: MinutesOfMeeting) => {
    console.log('New MoM created:', mom);
    setShowMoMForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meetings & Minutes</h2>
          <p className="text-gray-600">
            {selectedTeam === 'all' ? 'All Teams' : selectedTeam} - 
            {isAdmin ? ' Manage meetings and create minutes' : ' View meeting schedules and minutes'}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowMoMForm(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Meeting
          </Button>
        )}
      </div>

      {/* Scheduled Meetings */}
      {scheduledMeetings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Meetings</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              {scheduledMeetings.length}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scheduledMeetings.map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting} 
                isAdmin={isAdmin} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Meetings */}
      {completedMeetings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-500">Completed Meetings</h3>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
              {completedMeetings.length}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedMeetings.map((meeting) => (
              <MeetingCard 
                key={meeting.id} 
                meeting={meeting} 
                isAdmin={isAdmin} 
              />
            ))}
          </div>
        </div>
      )}

      {filteredMeetings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No meetings found for the selected team.</p>
          </CardContent>
        </Card>
      )}

      {/* MoM Form */}
      <MoMForm
        isOpen={showMoMForm}
        onClose={() => setShowMoMForm(false)}
        onSubmit={handleMoMSubmit}
        teams={teams}
        employees={employees}
      />
    </div>
  );
};

export default MoMManagement;

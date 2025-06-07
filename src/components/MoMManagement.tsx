
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MoMForm from '@/components/MoMForm';
import MeetingCard from '@/components/MeetingCard';
import { MinutesOfMeeting } from '@/services/minutesOfMeeting';
import { teams, employees, mockMeetings } from '@/components/mockData';

interface MoMManagementProps {
  selectedTeam: string;
  isAdmin: boolean;
}

const MoMManagement = ({ selectedTeam, isAdmin }: MoMManagementProps) => {
  const [meetings] = useState(mockMeetings);
  const [showMoMForm, setShowMoMForm] = useState(false);

  // Filter meetings based on selected team
  const filteredMeetings = meetings.filter(meeting => 
    selectedTeam === 'all' || meeting.team === selectedTeam
  );

  const handleMoMSubmit = (mom: MinutesOfMeeting) => {
    console.log('New MoM created:', mom);
    // In a real app, this would save to the backend
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

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMeetings.map((meeting) => (
          <MeetingCard 
            key={meeting.id} 
            meeting={meeting} 
            isAdmin={isAdmin} 
          />
        ))}
      </div>

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

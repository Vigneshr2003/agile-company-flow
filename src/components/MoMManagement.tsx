
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Users, FileText, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MoMForm from '@/components/MoMForm';
import { MinutesOfMeeting } from '@/services/minutesOfMeeting';

interface MoMManagementProps {
  selectedTeam: string;
  isAdmin: boolean;
}

const MoMManagement = ({ selectedTeam, isAdmin }: MoMManagementProps) => {
  // Mock data for teams and employees
  const teams = [
    { id: '1', name: 'Software Team' },
    { id: '2', name: 'Production Team' },
    { id: '3', name: 'Design Team' },
    { id: '4', name: 'Hardware & Assembly' }
  ];

  const employees = [
    { id: '1', full_name: 'Alice Johnson', email: 'alice@company.com' },
    { id: '2', full_name: 'Bob Smith', email: 'bob@company.com' },
    { id: '3', full_name: 'Carol Davis', email: 'carol@company.com' },
    { id: '4', full_name: 'David Wilson', email: 'david@company.com' },
    { id: '5', full_name: 'Eva Brown', email: 'eva@company.com' },
    { id: '6', full_name: 'Frank Miller', email: 'frank@company.com' },
    { id: '7', full_name: 'Grace Lee', email: 'grace@company.com' },
    { id: '8', full_name: 'Henry Chen', email: 'henry@company.com' }
  ];

  const [meetings] = useState([
    {
      id: 1,
      title: 'Sprint Planning Q1 2024',
      date: '2024-01-15',
      time: '10:00 AM',
      team: 'Software Team',
      attendees: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
      status: 'completed',
      agenda: ['Sprint goals review', 'Task assignments', 'Timeline discussion'],
      minutes: 'Discussed Q1 goals and assigned tasks. Sprint duration: 2 weeks. Next meeting: Jan 29.'
    },
    {
      id: 2,
      title: 'Production Review Meeting',
      date: '2024-01-18',
      time: '2:00 PM',
      team: 'Production Team',
      attendees: ['David Wilson', 'Eva Brown', 'Frank Miller'],
      status: 'scheduled',
      agenda: ['Production metrics', 'Quality control', 'Equipment maintenance'],
      minutes: ''
    },
    {
      id: 3,
      title: 'Design System Review',
      date: '2024-01-12',
      time: '11:00 AM',
      team: 'Design Team',
      attendees: ['Grace Lee', 'Henry Chen'],
      status: 'completed',
      agenda: ['Component library updates', 'Brand guidelines', 'Accessibility improvements'],
      minutes: 'Updated component library with new button variants. Discussed accessibility compliance for all components.'
    },
    {
      id: 4,
      title: 'Hardware Testing Protocol',
      date: '2024-01-20',
      time: '3:00 PM',
      team: 'Hardware & Assembly',
      attendees: ['Ian Parker', 'Julia Roberts'],
      status: 'scheduled',
      agenda: ['Testing procedures', 'Quality assurance', 'Documentation updates'],
      minutes: ''
    }
  ]);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showMoMForm, setShowMoMForm] = useState(false);

  // Filter meetings based on selected team
  const filteredMeetings = meetings.filter(meeting => 
    selectedTeam === 'all' || meeting.team === selectedTeam
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg">{meeting.title}</CardTitle>
                <Badge className={getStatusColor(meeting.status)}>
                  {meeting.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">⏰</span>
                  <span>{meeting.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{meeting.team}</span>
                </div>
                <div className="text-gray-500">
                  {meeting.attendees.length} attendees
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Agenda:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {meeting.agenda.slice(0, 2).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {meeting.agenda.length > 2 && (
                    <li className="text-gray-400 text-xs">
                      +{meeting.agenda.length - 2} more items
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{meeting.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">Date & Time</h4>
                          <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Team</h4>
                          <p className="text-sm text-gray-600">{meeting.team}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Attendees</h4>
                        <p className="text-sm text-gray-600">{meeting.attendees.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Agenda</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {meeting.agenda.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {meeting.minutes && (
                        <div>
                          <h4 className="font-medium">Minutes</h4>
                          <p className="text-sm text-gray-600">{meeting.minutes}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                {isAdmin && meeting.status === 'completed' && !meeting.minutes && (
                  <Button size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Add Minutes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
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

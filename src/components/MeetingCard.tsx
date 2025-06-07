
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText } from 'lucide-react';
import MeetingDetailsDialog from '@/components/MeetingDetailsDialog';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  team: string;
  attendees: string[];
  status: string;
  agenda: string[];
  minutes: string;
}

interface MeetingCardProps {
  meeting: Meeting;
  isAdmin: boolean;
}

const MeetingCard = ({ meeting, isAdmin }: MeetingCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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
          <MeetingDetailsDialog meeting={meeting} />
          {isAdmin && meeting.status === 'completed' && !meeting.minutes && (
            <Button size="sm" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Add Minutes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;

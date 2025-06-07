
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

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

interface MeetingDetailsDialogProps {
  meeting: Meeting;
}

const MeetingDetailsDialog = ({ meeting }: MeetingDetailsDialogProps) => {
  return (
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
  );
};

export default MeetingDetailsDialog;

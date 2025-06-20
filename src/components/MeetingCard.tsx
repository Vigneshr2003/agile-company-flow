import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, Download } from 'lucide-react';
import MeetingDetailsDialog from '@/components/MeetingDetailsDialog';
import { jsPDF } from 'jspdf';

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

  const downloadPDF = async () => {
    const doc = new jsPDF();

    // Add logo, or just export PDF if not available
    let yOffset = 10 + 16 + 8; // Y position after logo (default)
    let logoAdded = false;
    try {
      const logoUrl = '/components/asset/logo.png';
      const response = await fetch(logoUrl);
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = function () {
          try {
            const logo = reader.result as string;
            doc.addImage(logo, 'PNG', 10, 10, 32, 16);
            logoAdded = true;
            renderPDF(doc, yOffset);
          } catch (addImgErr) {
            console.warn('Error adding logo image, proceeding without logo:', addImgErr);
            renderPDF(doc, 20);
          }
        };
        reader.onerror = function (e) {
          console.warn('Error reading logo blob, proceeding without logo:', e);
          renderPDF(doc, 20);
        };
        reader.readAsDataURL(blob);
        return; // Wait for async FileReader!
      } else {
        console.warn("Logo not found (404), generating PDF without logo.");
        renderPDF(doc, 20);
      }
    } catch (err) {
      console.warn('Failed fetching/processing logo, skipping logo:', err);
      renderPDF(doc, 20);
    }

    // This will be called on success or catch/finally above.
    function renderPDF(doc: jsPDF, startY: number = 20) {
      let y = logoAdded ? 35 : startY;
      doc.setFontSize(18);
      doc.text(meeting.title, 10, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(`Date: ${meeting.date}   Time: ${meeting.time}`, 10, y); y += 8;
      doc.text(`Team: ${meeting.team}`, 10, y); y += 8;
      doc.text('Attendees:', 10, y); y += 6;
      doc.text(meeting.attendees.join(', '), 18, y); y += 8;
      doc.text('Agenda:', 10, y); y += 6;
      meeting.agenda.forEach(item => {
        doc.text(`- ${item}`, 18, y); y += 6;
      });
      if (meeting.minutes) {
        y += 4;
        doc.text('Minutes:', 10, y); y += 6;
        doc.text(meeting.minutes, 18, y); y += 8;
      }
      doc.save(`${meeting.title.replace(/\s+/g, "_")}_details.pdf`);
      console.log("PDF download triggered (logoAdded:", logoAdded, ")");
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <CardTitle className="text-base sm:text-lg break-words min-w-0 flex-1">{meeting.title}</CardTitle>
          <Badge className={`${getStatusColor(meeting.status)} shrink-0 self-start`}>
            {meeting.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
            <span className="truncate">{meeting.date}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 shrink-0">⏰</span>
            <span className="truncate">{meeting.time}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <Users className="h-4 w-4 text-gray-500 shrink-0" />
            <span className="truncate">{meeting.team}</span>
          </div>
          <div className="text-gray-500 text-sm">
            {meeting.attendees.length} attendees
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2 text-sm sm:text-base">Agenda:</h4>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
            {meeting.agenda.slice(0, 2).map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400 shrink-0">•</span>
                <span className="break-words">{item}</span>
              </li>
            ))}
            {meeting.agenda.length > 2 && (
              <li className="text-gray-400 text-xs">
                +{meeting.agenda.length - 2} more items
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <MeetingDetailsDialog meeting={meeting} />
          {/* Ensuring Download PDF button always shown and works */}
          <Button size="sm" className="w-full sm:flex-1" onClick={downloadPDF} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {isAdmin && meeting.status === 'completed' && !meeting.minutes && (
            <Button size="sm" className="w-full sm:flex-1">
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

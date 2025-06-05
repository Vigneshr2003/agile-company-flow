
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Calendar, Users, FileText } from 'lucide-react';
import { MinutesOfMeeting, ActionItem } from '@/services/minutesOfMeeting';

interface MoMFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mom: MinutesOfMeeting) => void;
  teams: any[];
  employees: any[];
  initialData?: MinutesOfMeeting;
}

const MoMForm = ({ isOpen, onClose, onSubmit, teams, employees, initialData }: MoMFormProps) => {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [newActionItem, setNewActionItem] = useState({ task: '', assignedTo: '', deadline: '' });

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<MinutesOfMeeting>();

  const meetingType = watch('meeting_type');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedParticipants(initialData.participants || []);
      setActionItems(initialData.action_items || []);
    } else {
      reset();
      setSelectedParticipants([]);
      setActionItems([]);
    }
  }, [initialData, reset]);

  const addParticipant = (participantId: string) => {
    if (!selectedParticipants.includes(participantId)) {
      setSelectedParticipants([...selectedParticipants, participantId]);
    }
  };

  const removeParticipant = (participantId: string) => {
    setSelectedParticipants(selectedParticipants.filter(id => id !== participantId));
  };

  const addActionItem = () => {
    if (newActionItem.task && newActionItem.assignedTo && newActionItem.deadline) {
      const actionItem: ActionItem = {
        id: Date.now().toString(),
        ...newActionItem,
        status: 'pending'
      };
      setActionItems([...actionItems, actionItem]);
      setNewActionItem({ task: '', assignedTo: '', deadline: '' });
    }
  };

  const removeActionItem = (id: string) => {
    setActionItems(actionItems.filter(item => item.id !== id));
  };

  const handleFormSubmit = (data: MinutesOfMeeting) => {
    const formData = {
      ...data,
      participants: selectedParticipants,
      action_items: actionItems,
      attachments: []
    };
    onSubmit(formData);
    onClose();
  };

  const getEmployeeName = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? employee.full_name || employee.email : 'Unknown';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {initialData ? 'Edit Minutes of Meeting' : 'Create Minutes of Meeting'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Meeting Title *</Label>
                  <Input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    placeholder="Enter meeting title"
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="date">Date & Time *</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    {...register('date', { required: 'Date is required' })}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Meeting Type *</Label>
                  <Select onValueChange={(value) => setValue('meeting_type', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Meeting</SelectItem>
                      <SelectItem value="project">Project Meeting</SelectItem>
                      <SelectItem value="one_on_one">One-on-One</SelectItem>
                      <SelectItem value="client">Client Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Team Involved</Label>
                  <Select onValueChange={(value) => setValue('team_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Add Participants</Label>
                <Select onValueChange={addParticipant}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select participant to add" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees
                      .filter(emp => !selectedParticipants.includes(emp.id))
                      .map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.full_name || employee.email}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedParticipants.map((participantId) => (
                  <Badge key={participantId} variant="secondary" className="flex items-center gap-1">
                    {getEmployeeName(participantId)}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeParticipant(participantId)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meeting Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meeting Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="agenda">Agenda</Label>
                <Textarea
                  id="agenda"
                  {...register('agenda')}
                  placeholder="Meeting agenda..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="discussion_summary">Discussion Summary</Label>
                <Textarea
                  id="discussion_summary"
                  {...register('discussion_summary')}
                  placeholder="Summary of discussions..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="decisions_made">Decisions Made</Label>
                <Textarea
                  id="decisions_made"
                  {...register('decisions_made')}
                  placeholder="Key decisions made during the meeting..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Any additional notes or comments..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Action Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  placeholder="Task description"
                  value={newActionItem.task}
                  onChange={(e) => setNewActionItem({...newActionItem, task: e.target.value})}
                />
                <Select onValueChange={(value) => setNewActionItem({...newActionItem, assignedTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.full_name || employee.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newActionItem.deadline}
                  onChange={(e) => setNewActionItem({...newActionItem, deadline: e.target.value})}
                />
                <Button type="button" onClick={addActionItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-gray-600">
                        Assigned to: {getEmployeeName(item.assignedTo)} | Due: {item.deadline}
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeActionItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Create'} Minutes of Meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MoMForm;

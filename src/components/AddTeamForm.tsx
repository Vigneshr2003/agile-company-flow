
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddTeamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamData: any) => void;
}

const AddTeamForm = ({ isOpen, onClose, onSubmit }: AddTeamFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    lead: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      ...formData,
      memberCount: 0
    });
    setFormData({ name: '', description: '', lead: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="teamLead">Team Lead</Label>
            <Input
              id="teamLead"
              value={formData.lead}
              onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Team</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamForm;

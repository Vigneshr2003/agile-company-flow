
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
    lead: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create team with admin credentials
      const teamData = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        lead: formData.lead,
        memberCount: 0,
        adminEmail: formData.email,
        adminPassword: formData.password
      };
      
      onSubmit(teamData);
      setFormData({ name: '', description: '', lead: '', email: '', password: '' });
      onClose();
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md mx-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Create New Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-sm font-medium">Team Name</Label>
            <Input
              id="teamName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter team name"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the team's purpose"
              required
              className="w-full min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teamLead" className="text-sm font-medium">Team Lead</Label>
            <Input
              id="teamLead"
              value={formData.lead}
              onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              placeholder="Team lead name"
              required
              className="w-full"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Team Admin Login Credentials</h4>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail" className="text-sm font-medium">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@teamname.maxmoc.in"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminPassword" className="text-sm font-medium">Admin Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create secure password"
                required
                minLength={8}
                className="w-full"
              />
              <p className="text-xs text-gray-500">Minimum 8 characters</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto order-2 sm:order-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto order-1 sm:order-2"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Team'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamForm;

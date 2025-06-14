
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditTeamLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  currentLead: string;
  onSave: (newLead: string) => void;
}

const EditTeamLeadDialog = ({
  isOpen,
  onClose,
  teamName,
  currentLead,
  onSave,
}: EditTeamLeadDialogProps) => {
  const [value, setValue] = useState(currentLead);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Team Lead</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(value);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Team: {teamName}</label>
          </div>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Team Leader Name"
            required
            className="w-full"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamLeadDialog;

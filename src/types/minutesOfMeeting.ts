
export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface MinutesOfMeeting {
  id?: string;
  title: string;
  date: string;
  meeting_type: 'team' | 'project' | 'one_on_one' | 'client';
  team_id?: string;
  participants: string[];
  agenda?: string;
  discussion_summary?: string;
  decisions_made?: string;
  action_items: ActionItem[];
  notes?: string;
  attachments?: string[];
  created_at?: string;
  updated_at?: string;
}

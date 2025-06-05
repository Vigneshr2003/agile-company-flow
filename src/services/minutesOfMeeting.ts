
import { supabase } from '@/integrations/supabase/client';

export interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
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
  attachments: any[];
  notes?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export const createMoM = async (mom: MinutesOfMeeting) => {
  const { data, error } = await (supabase as any)
    .from('minutes_of_meeting')
    .insert([mom])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getMoMs = async () => {
  const { data, error } = await (supabase as any)
    .from('minutes_of_meeting')
    .select(`
      *,
      teams (name),
      profiles!created_by (full_name, email)
    `)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const getMoMById = async (id: string) => {
  const { data, error } = await (supabase as any)
    .from('minutes_of_meeting')
    .select(`
      *,
      teams (name),
      profiles!created_by (full_name, email)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const updateMoM = async (id: string, updates: Partial<MinutesOfMeeting>) => {
  const { data, error } = await (supabase as any)
    .from('minutes_of_meeting')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteMoM = async (id: string) => {
  const { error } = await (supabase as any)
    .from('minutes_of_meeting')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

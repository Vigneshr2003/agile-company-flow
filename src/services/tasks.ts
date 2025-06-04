
import { supabase } from '@/integrations/supabase/client';

export const tasksService = {
  async getTeamTasks(teamId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, assigned_by:profiles!tasks_assigned_by_fkey(full_name)')
      .eq('assigned_to_team', teamId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createTask(taskData: any) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single();
    return { data, error };
  },

  async updateTask(id: string, updates: any) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    return { error };
  },

  subscribeToTasks(teamId: string, callback: (payload: any) => void) {
    return supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `assigned_to_team=eq.${teamId}`
        },
        callback
      )
      .subscribe();
  }
};

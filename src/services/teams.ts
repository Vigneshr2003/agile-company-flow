
import { supabase } from '@/integrations/supabase/client';

export const teamsService = {
  async getAllTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createTeam(teamData: { name: string; description?: string }) {
    const { data, error } = await supabase
      .from('teams')
      .insert([teamData])
      .select()
      .single();
    return { data, error };
  },

  async updateTeam(id: string, updates: { name?: string; description?: string }) {
    const { data, error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async deleteTeam(id: string) {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    return { error };
  }
};

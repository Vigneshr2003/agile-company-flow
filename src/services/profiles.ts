
import { supabase } from '@/integrations/supabase/client';

export const profilesService = {
  async getCurrentProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: 'Not authenticated' };

    const { data, error } = await supabase
      .from('profiles')
      .select('*, teams(name)')
      .eq('id', user.id)
      .single();
    return { data, error };
  },

  async getTeamProfiles(teamId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async updateProfile(id: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async createEmployee(employeeData: any) {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: employeeData.email,
      password: employeeData.password || 'TempPassword123!',
      email_confirm: true,
      user_metadata: {
        full_name: employeeData.full_name,
        role: 'employee'
      }
    });

    if (authError) return { data: null, error: authError };

    // Profile will be created automatically by trigger
    return { data: authData.user, error: null };
  }
};

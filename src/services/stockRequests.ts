
import { supabase } from '@/integrations/supabase/client';

export const stockRequestsService = {
  async getTeamStockRequests(teamId: string) {
    const { data, error } = await supabase
      .from('stock_requests')
      .select('*, requested_by:profiles!stock_requests_requested_by_fkey(full_name)')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createStockRequest(requestData: any) {
    const { data, error } = await supabase
      .from('stock_requests')
      .insert([requestData])
      .select()
      .single();
    return { data, error };
  },

  async updateStockRequest(id: string, updates: any) {
    const { data, error } = await supabase
      .from('stock_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  subscribeToStockRequests(teamId: string, callback: (payload: any) => void) {
    return supabase
      .channel('stock-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stock_requests',
          filter: `team_id=eq.${teamId}`
        },
        callback
      )
      .subscribe();
  }
};

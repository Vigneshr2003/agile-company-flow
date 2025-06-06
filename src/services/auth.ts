
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signUp(email: string, password: string, userData?: { full_name?: string; role?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  },

  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Admin function to create users (super admin only)
  async createUser(email: string, password: string, userData: { full_name: string; role: string; team_id?: string }) {
    // This would typically be done through an edge function for security
    // For now, we'll use the sign up method
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  // Create super admin function
  async createSuperAdmin() {
    console.log('Creating super admin account...');
    const { data, error } = await supabase.auth.signUp({
      email: 'sathya@gmail.com',
      password: 'Maxmoc@2025',
      options: {
        data: {
          full_name: 'Super Admin',
          role: 'super_admin'
        }
      }
    });

    if (error) {
      console.error('Error creating super admin:', error);
      return { data: null, error };
    }

    // If user already exists but not confirmed, try to sign in
    if (error && error.message.includes('User already registered')) {
      console.log('User already exists, trying to sign in...');
      return await this.signIn('sathya@gmail.com', 'Maxmoc@2025');
    }

    console.log('Super admin created successfully:', data);
    return { data, error: null };
  }
};

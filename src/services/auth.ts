
// Frontend-only auth service with hardcoded credentials
export interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'team_admin';
  full_name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Hardcoded user credentials
const users: Record<string, { password: string; user: User }> = {
  'sathya@gmail.com': {
    password: 'Maxmoc@2025',
    user: {
      id: '1',
      email: 'sathya@gmail.com',
      role: 'super_admin',
      full_name: 'Super Admin'
    }
  },
  'admin@software.maxmoc.in': {
    password: 'Software@123',
    user: {
      id: '2',
      email: 'admin@software.maxmoc.in',
      role: 'team_admin',
      full_name: 'Software Team Admin'
    }
  },
  'admin@production.maxmoc.in': {
    password: 'Production@123',
    user: {
      id: '3',
      email: 'admin@production.maxmoc.in',
      role: 'team_admin',
      full_name: 'Production Team Admin'
    }
  },
  'admin@hardware.maxmoc.in': {
    password: 'Hardware@123',
    user: {
      id: '4',
      email: 'admin@hardware.maxmoc.in',
      role: 'team_admin',
      full_name: 'Hardware Team Admin'
    }
  },
  'admin@design.maxmoc.in': {
    password: 'Design@123',
    user: {
      id: '5',
      email: 'admin@design.maxmoc.in',
      role: 'team_admin',
      full_name: 'Design Team Admin'
    }
  }
};

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userRecord = users[email];
    
    if (!userRecord || userRecord.password !== password) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(userRecord.user));
    
    return {
      success: true,
      user: userRecord.user
    };
  },

  async signOut(): Promise<void> {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  async resetPassword(email: string): Promise<AuthResponse> {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (users[email]) {
      return {
        success: true
      };
    }
    
    return {
      success: false,
      error: 'Email not found'
    };
  },

  // Frontend-only password update
  async updatePassword(newPassword: string): Promise<{ error?: { message: string } }> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { error: { message: 'No user logged in' } };
    }
    
    // In a real app, this would update the backend
    console.log('Password would be updated for:', currentUser.email);
    return {};
  },

  // Frontend-only user creation
  async createUser(email: string, password: string, metadata: { full_name: string; role: string }): Promise<{ error?: { message: string } }> {
    // In a real app, this would create the user in the backend
    console.log('User would be created:', { email, metadata });
    
    // Add the new user to our hardcoded users for demo purposes
    const newUserId = Date.now().toString();
    users[email] = {
      password,
      user: {
        id: newUserId,
        email,
        role: metadata.role as 'super_admin' | 'team_admin',
        full_name: metadata.full_name
      }
    };
    
    return {};
  }
};

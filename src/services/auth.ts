
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
      full_name: 'Team Admin'
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
  }
};

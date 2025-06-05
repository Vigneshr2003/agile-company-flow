
import { authService } from '@/services/auth';

export const createSuperAdminAccount = async () => {
  try {
    console.log('Creating super admin account...');
    
    const { data, error } = await authService.signUp(
      'sathya@maxmoc.in',
      'Maxmoc@2025',
      {
        full_name: 'Sathya Super Admin',
        role: 'super_admin'
      }
    );

    if (error) {
      console.error('Error creating super admin:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Super admin account created successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// You can call this function from the browser console:
// import { createSuperAdminAccount } from './src/utils/createSuperAdmin';
// createSuperAdminAccount();

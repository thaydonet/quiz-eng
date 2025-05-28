import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const assignRole = async (userId: string, role: 'admin' | 'teacher' | 'student'): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });

    if (error) throw error;
    
    await logAdminAction('assign_role', { userId, role });
    toast.success(`Successfully assigned ${role} role`);
    return true;
  } catch (error) {
    console.error('Error assigning role:', error);
    toast.error('Failed to assign role');
    return false;
  }
};

export const removeRole = async (userId: string, role: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) throw error;
    
    await logAdminAction('remove_role', { userId, role });
    toast.success(`Successfully removed ${role} role`);
    return true;
  } catch (error) {
    console.error('Error removing role:', error);
    toast.error('Failed to remove role');
    return false;
  }
};

export const logAdminAction = async (action: string, details: any): Promise<void> => {
  try {
    const { error } = await supabase
      .from('admin_logs')
      .insert({
        action,
        details
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};
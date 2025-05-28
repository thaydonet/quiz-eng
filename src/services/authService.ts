import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

export const signUp = async (email: string, password: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error signing up:', error);
    toast.error('Failed to sign up. Please try again.');
    return null;
  }
};

export const signIn = async (email: string, password: string): Promise<{ user: User | null; needsEmailConfirmation: boolean }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { user: null, needsEmailConfirmation: true };
      }
      throw error;
    }
    return { user: data.user, needsEmailConfirmation: false };
  } catch (error) {
    console.error('Error signing in:', error);
    toast.error('Failed to sign in. Please check your credentials.');
    return { user: null, needsEmailConfirmation: false };
  }
};

export const resendConfirmationEmail = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    
    if (error) throw error;
    
    toast.success('Confirmation email sent! Please check your inbox.');
    return true;
  } catch (error) {
    console.error('Error resending confirmation email:', error);
    toast.error('Failed to resend confirmation email. Please try again.');
    return false;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    toast.error('Failed to sign out. Please try again.');
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
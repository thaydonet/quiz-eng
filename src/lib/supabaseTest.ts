import { supabase } from './supabaseClient';

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('tests').select('*');
    
    if (error) {
      console.error('Connection error:', error.message);
      return false;
    }
    
    console.log('Successfully connected to Supabase!');
    console.log('Found', data.length, 'tests');
    return true;
  } catch (error) {
    console.error('Failed to connect:', error);
    return false;
  }
}
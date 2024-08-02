import { supabase } from '../../client';


export const fetchUsers = async ({setUsers}) => {
    const { data, error } = await supabase.from('user').select();
    if (error) {
      console.error('Error fetching users:', error);
      return;
    }
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.error('Error formatting users:', data);
    }
  };
import { supabase } from '../../../../../utils/supabase/client';

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('user').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

import { supabase } from '../../../../../utils/supabase/client';
import bcrypt from 'bcryptjs';

export const createUser = async (
  name: string,
  email: string,
  password: string,
  profileImage: File,
) => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.-]/g, '');
  const imageFileName = `${timestamp}-${email}-${profileImage.name}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(`PDP/${imageFileName}`, profileImage);

  if (uploadError) {
    throw new Error('Error uploading image');
  }

  const { data: imageData } = supabase.storage
    .from('images')
    .getPublicUrl(`PDP/${imageFileName}`);

  const imageUrl = imageData.publicUrl;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const { data, error } = await supabase
    .from('user')
    .insert([
      { name, email, password: hashedPassword, profile_image_url: imageUrl },
    ]);

  if (error) {
    throw new Error('Error creating user');
  }

  return data;
};

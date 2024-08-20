import { supabase } from '../../../../../utils/supabase/client';

export const uploadImage = async (file: File, productId: string) => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.-]/g, '');
  const imageFileName = `${timestamp}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(`PDP/${imageFileName}`, file);

  if (uploadError) {
    throw new Error('Error uploading image');
  }

  const { data: imageData } = supabase.storage
    .from('images')
    .getPublicUrl(`PDP/${imageFileName}`);

  const imageUrl = imageData.publicUrl;

  const { data, error: dbError } = await supabase
    .from('image')
    .insert([{ product_id: productId, image_url: imageUrl }]);

  if (dbError) {
    throw new Error('Error inserting image URL into database');
  }

  return imageUrl;
};

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase/client';

interface Category {
  id: number;
  name: string;
}

const HandleCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: dataCategories, error } = await supabase
        .from('category')
        .select('*');

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(dataCategories);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    const { data, error } = await supabase
      .from('category')
      .insert([{ name: newCategoryName }])
      .select();

    if (error) {
      console.error('Error adding category:', error);
    } else {
      if (data && data.length > 0) {
        setCategories((prevCategories) => [...prevCategories, data[0]]);
      }
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const { error } = await supabase.from('category').delete().eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Modify Categories</h3>
      <input
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="New category name"
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleAddCategory}
        className="bg-teal-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Category
      </button>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center mb-2"
          >
            <span>{category.name}</span>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete Category
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HandleCategory;

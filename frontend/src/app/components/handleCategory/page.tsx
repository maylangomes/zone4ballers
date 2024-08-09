'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/app/types/type';

const HandleCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/controllers/categoriesController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Error fetching categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    try {
      const response = await fetch('/api/controllers/addCategoryController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCategoryName }),
      });

      if (!response.ok) {
        throw new Error('Error adding category');
      }

      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data.category]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(
        '/api/controllers/deleteCategoryController',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      );

      if (!response.ok) {
        throw new Error('Error deleting category');
      }

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id),
      );
    } catch (error) {
      console.error('Error deleting category:', error);
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

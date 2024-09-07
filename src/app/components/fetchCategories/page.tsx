'use client'

import { FC, useEffect } from 'react';

interface FetchCategoriesProps {
  setCategoryFilter: (categoryId: string | null) => void;
  setCategories: (categories: { id: string; name: string }[]) => void;
  categories: { id: string; name: string }[];
}

const FetchCategories: FC<FetchCategoriesProps> = ({
  setCategoryFilter,
  setCategories,
  categories,
}) => {
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
  }, [setCategories]);

  return (
    <div>
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FetchCategories;

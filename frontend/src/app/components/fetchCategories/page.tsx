import { FC } from 'react';

interface FetchCategoriesProps {
  setCategoryFilter: (categoryId: string | null) => void;
  categories: { id: string; name: string }[];
}

const FetchCategories: FC<FetchCategoriesProps> = ({ setCategoryFilter, categories }) => {
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

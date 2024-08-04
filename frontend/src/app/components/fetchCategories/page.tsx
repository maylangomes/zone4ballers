interface FetchCategoriesProps {
  setCategories: (categories: { id: string; name: string }[]) => void;
  setCategoryFilter: (categoryId: string | null) => void;
  categories: { id: string; name: string }[];
}

const FetchCategories = ({ setCategories, setCategoryFilter, categories }: FetchCategoriesProps) => {
  return (
    <div>
      <select onChange={(e) => setCategoryFilter(e.target.value)} className="border rounded p-2">
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

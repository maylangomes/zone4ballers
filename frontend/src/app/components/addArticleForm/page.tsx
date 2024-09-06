import { useEffect, useState } from 'react';

export default function AddArticleForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    details: '',
    stock: '',
    category_id: '',
    color_id: '',
    size: '',
    rating: '',
    country: '',
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);

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

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await fetch('/api/controllers/colorController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Error fetching color');
        }

        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error try fetching color:', error);
      }
    };

    fetchColor();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isConfirmed = confirm('Are you sure you want to add this article?');

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch('/api/controllers/addArticleController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding article');
      }

      const data = await response.json();
      window.location.reload();
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Error adding article');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter un article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          value={formData.name}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          onChange={handleChange}
          value={formData.price}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          name="details"
          placeholder="Détails"
          onChange={handleChange}
          value={formData.details}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          value={formData.stock}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleChange}
          value={formData.size}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
          value={formData.rating}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          value={formData.country}
          className="border p-2 mb-2 w-full"
          required
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="color_id"
          value={formData.color_id}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        >
          <option value="">Sélectionnez une couleur</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/type';
import { NextResponse } from 'next/server';

interface AdminCardProps {
  product: Product;
  onUpdate: (id: number, updatedData: Partial<Product>) => void;
  onAddToBasket: (product: Product) => void;
  onProductDelete: (id: number) => void;
}

export default function AdminCard({
  product,
  onUpdate,
  onAddToBasket,
  onProductDelete,
}: AdminCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product.name,
    description: product.description,
    price: product.price,
    details: product.details,
    stock: product.stock,
    category_id: product.category_id,
    color_id: product.color_id,
    size: product.size,
    rating: product.rating,
    country: product.country,
    is_available: product.is_available,
    is_new: product.is_new,
    is_promoted: product.is_promoted,
    store_id: product.store_id,
  });
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string | null>(null);

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
        // console.log('data categorie 1 :', data);

        setCategories(data);
      } catch (error) {
        console.error('Error try fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // console.log('CATEGORIES HERE', categories);
  }, [categories]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          '/api/controllers/categoriesByIdController',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryId: product.category_id }),
          },
        );

        if (!response.ok) {
          throw new Error('Error fetching category');
        }

        const data = await response.json();
        setCategoryName(data.category ? data.category.name : 'No Category');
      } catch (error) {
        console.error('Error try fetch category:', error);
      }
    };

    fetchCategory();
  }, [product.category_id]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        // console.log('body color id:', JSON.stringify({ colorId: product.color_id }));
        const response = await fetch('api/controllers/colorIdController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ colorId: product.color_id }),
        });

        if (!response.ok) {
          throw new Error('error fetching color');
        }

        const data = await response.json();

        // console.log('Data color : ', data);

        setColorName(data.color ? data.color.name : 'No color');
        
      } catch (error) {
        console.error('Error try fetch color');
      }
    };

    fetchColor();
  }, [product.color_id]);

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../pages/detailsProducts/${product.id}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/controllers/updateProductController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error('Error response.ok product');
      }

      const data = await response.json();
      onUpdate(product.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error try update product:', error);
      alert('Error updating product');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
      setFormData({ ...formData, category_id: parseInt(value) });
      setSelectedCategory(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/controllers/deleteProductController', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id: product.id }),
      });
      if (!response.ok) {
        throw new Error('error response.ok delete');
      }
      onProductDelete(product.id);
    } catch (error) {
      console.error('error try delete product', error);
      alert('error fetching delete');
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="color"
            value={formData.color_id}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <select
            name="is_available"
            value={formData.is_available ? 'true' : 'false'}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <select
            name="is_new"
            value={formData.is_new ? 'true' : 'false'}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="true">New</option>
            <option value="false">Not New</option>
          </select>
          <select
            name="is_promoted"
            value={formData.is_promoted ? 'true' : 'false'}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="true">Promoted</option>
            <option value="false">Not Promoted</option>
          </select>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-lg font-bold mb-4">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price}</p>
          <p className="text-lg font-bold mb-4">Color : {colorName}</p>
          <p className="text-lg font-bold mb-4">Category : {categoryName}</p>
          {!product.is_available ? (
            <p className="text-teal-500 font-bold mb-4">Unavailable</p>
          ) : (
            <p className="text-teal-500 font-bold mb-4">Available</p>
          )}
          {!product.is_promoted ? (
            <p className="text-teal-500 font-bold mb-4"></p>
          ) : (
            <p className="text-teal-500 font-bold mb-4">On sale</p>
          )}
          {!product.is_new ? (
            <p className="text-teal-500 font-bold mb-4"></p>
          ) : (
            <p className="text-teal-500 font-bold mb-4">That's new !</p>
          )}
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            onClick={handleClick}
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          >
            Details
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => onAddToBasket(product)}
          >
            Add to basket
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

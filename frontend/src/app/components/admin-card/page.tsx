import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase/client';
import { Product } from '@/app/types/type';
import { Category } from '@/app/types/type';

interface AdminCardProps {
  product: Product;
  onUpdate: (id: number, updatedData: Partial<Product>) => void;
}

export default function AdminCard({ product, onUpdate }: AdminCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: product.name,
    description: product.description,
    price: product.price,
    details: product.details,
    stock: product.stock,
    category_id: product.category_id,
    color: product.color,
    size: product.size,
    rating: product.rating,
    country: product.country,
    is_available: product.is_available,
    is_new: product.is_new,
    is_promoted: product.is_promoted,
    store_id: product.store_id,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: dataCategories, error } = await supabase
        .from('category')
        .select('id, name');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(dataCategories || []);
        const foundCategory = dataCategories?.find(
          (category) => category.id === product.category_id,
        );
        setCategoryName(foundCategory ? foundCategory.name : null);
      }
    };

    fetchCategories();
  }, [product.category_id]);

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../pages/detailsProducts/${product.id}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('product')
      .update(formData)
      .eq('id', product.id);

    if (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } else {
      onUpdate(product.id, formData);
      setIsEditing(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            value={formData.color}
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
          <p className="text-lg font-bold mb-4">Category: {categoryName}</p>
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
          <button className="bg-teal-500 text-white px-4 py-2 rounded mt-2">
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}

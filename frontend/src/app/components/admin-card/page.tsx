import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/type';

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
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [colors, setColors] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string | null>(null);
  const [adjustedPrice, setAdjustedPrice] = useState<number | null>(null);

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
        console.error('Error try fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchColors = async () => {
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
          throw new Error('Error fetching colors');
        }
        fetchColors;

        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error try fetch colors:', error);
      }
    };

    fetchColors();
  }, []);

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
    const fetchProductImages = async () => {
      try {
        const response = await fetch('/api/controllers/showImageController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.id }),
        });

        if (!response.ok) {
          throw new Error('Error fetching product images');
        }

        const data = await response.json();
        setProductImages(data.imageUrls);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    fetchProductImages();
  }, [product.id]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        // console.log('BODY COLOR ID:', product.color_id );
        const response = await fetch('/api/controllers/colorIdController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ colorId: product.color_id }),
        });

        if (!response.ok) {
          throw new Error('Error fetching color');
        }

        const data = await response.json();
        setColorName(data.colorPrice.name ? data.colorPrice.name : 'No Color');

        const productAdjustedPrice =
          data.adjustedPrices.find(
            (price: { productId: number }) => price.productId === product.id,
          )?.adjustedPrice || null;

        setAdjustedPrice(productAdjustedPrice);
      } catch (error) {
        console.error('Error try fetch color:', error);
      }
    };

    fetchColor();
  }, [product.color_id, product.id]);

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../pages/detailsProducts/${product.id}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    const confirmSave = confirm('Are you sure ?');
    if (confirmSave) {
      try {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('productId', product.id.toString());
          formData.append('file', selectedFile);

          const response = await fetch(
            '/api/controllers/uploadImageController',
            {
              method: 'POST',
              body: formData,
            },
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Server error response:', errorMessage);
            throw new Error(`Error uploading image: ${errorMessage}`);
          }
        }
        const response = await fetch(
          '/api/controllers/updateProductController',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: product.id,
              formData,
            }),
          },
        );

        if (!response.ok) {
          throw new Error('Error response.ok product');
        }

        const data = await response.json();
        if (confirmSave) {
          onUpdate(product.id, formData);
          setIsEditing(false);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error try update product:', error);
        alert('Error updating product');
      }
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
        throw new Error('Error response.ok delete');
      }
      onProductDelete(product.id);
    } catch (error) {
      console.error('Error try delete product', error);
      alert('Error fetching delete');
    }
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      {isEditing ? (
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="details"
            placeholder="details"
            value={formData.details}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="stock"
            placeholder="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <select
            name="color_id"
            value={formData.color_id}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="size"
            placeholder="size"
            value={formData.size}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="rating"
            placeholder="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="country"
            placeholder="country"
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
          <p className="text-lg font-bold mb-4">
            Without color : ${product.price}
          </p>
          <p className="text-lg font-bold mb-4">Color : {colorName}</p>
          <p className="text-lg font-bold mb-4">Category : {categoryName}</p>
          {adjustedPrice !== null && (
            <p className="text-lg font-bold mb-4">
              Final Price : ${adjustedPrice.toFixed(2)}
            </p>
          )}
          {!product.is_available ? (
            <p className="text-red-500 font-bold mb-4">Unavailable</p>
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
          {productImages.length > 0 && (
            <div className="mb-4">
              {productImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Product Image ${index + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    marginRight: '8px',
                  }}
                />
              ))}
            </div>
          )}
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            onClick={handleClick}
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2 mt-2"
          >
            Details
          </button>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded mr-2 mt-2"
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

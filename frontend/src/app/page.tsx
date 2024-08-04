'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminCard from '../app/components/admin-card/page';
import Card from '../app/components/card/page';
import HandleCategory from '../app/components/handleCategory/page';
import FetchProducts from './components/fetchProduct/page';
import FetchUsers from './components/fetchUsers/page';
import StorageUser from './components/storageUser/page';
import DecryptAdminCookie from './components/admin-cookie/page';
import HandleLogout from './components/handleLogout/page';
import FetchCategories from './components/fetchCategories/page';
import { ProductWithCategory } from './types/type';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

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

  return (
    <div className="container mx-auto p-4">
      <DecryptAdminCookie setIsAdmin={setIsAdmin} />
      <FetchCategories setCategories={setCategories} setCategoryFilter={setCategoryFilter} categories={categories} />
      <FetchProducts
        setProducts={setProducts}
        setLoadingProducts={setLoadingProducts}
        filter={{ categoryId: categoryFilter }}
      />
      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Products:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) =>
              isAdmin ? (
                <AdminCard
                  key={product.id}
                  product={product}
                  onUpdate={() => {}}
                />
              ) : (
                <Card key={product.id} product={product} />
              ),
            )}
            {isAdmin && <HandleCategory />}
          </div>
        </div>
      )}
      <div className="mt-8">
        <StorageUser />
        <FetchUsers setUsers={setUsers} setLoadingUsers={setLoadingUsers} />
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <div>
            <h2>Users :</h2>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '10px 0',
                }}
              >
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                {user.profile_image_url ? (
                  <img
                    src={user.profile_image_url}
                    alt={`${user.name}'s profile`}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <p>No profile image</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-8">
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => router.push('/pages/signup')}
        >
          Sign up
        </button>
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => router.push('/pages/login')}
        >
          Login
        </button>
        <HandleLogout setIsAdmin={setIsAdmin} />
      </div>
    </div>
  );
}

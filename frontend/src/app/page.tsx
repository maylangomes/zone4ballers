'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminCard from '../app/components/admin-card/page';
import Card from '../app/components/card/page';
import Cookies from 'js-cookie';
import HandleCategory from '../app/components/handleCategory/page';
import FetchProducts from '../../utils/supabase/controller/productController/page';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  details: string;
  stock: number;
  category_id: number;
  category: Category;
  color: string;
  size: string;
  rating: number;
  country: string;
  is_available: boolean;
  is_new: boolean;
  is_promoted: boolean;
  store_id: number;
}

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Error response fetch users');
        }
        const data = await response.json();
        console.log('Users fetched:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error catch fetch users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();

    const user = localStorage.getItem('username');
    if (user) {
      console.log('User connected:', user);
    } else {
      console.log('No user connected');
    }

    const fetchAdminCookie = async () => {
      try {
        const response = await fetch("/api/decrypt_admin", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
            console.log("décrypté et admin");
          } else {
            console.log("décrypté mais pas admin");
            console.log(data.isAdmin);
          }
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("error try fetch :", error);
      }
    };

    fetchAdminCookie();
  }, []);

  const handleUpdate = (id: number, updatedData: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product,
      ),
    );
  };

  const handleLogout = () => {
    Cookies.remove('admin');
    localStorage.removeItem('username');
    setIsAdmin(false);
  };

  return (
    <div className="container mx-auto p-4">
      <FetchProducts setProducts={setProducts} setLoadingProducts={setLoadingProducts} />
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
                  onUpdate={handleUpdate}
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
            <button type="button" onClick={() => router.push('/signup')}>
              Sign up
            </button>
            <br />
            <button type="button" onClick={() => router.push('/login')}>
              Login
            </button>
          </div>
        )}
      </div>
      <div className="mt-8">
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => router.push('/signup')}
        >
          Sign up
        </button>
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import AdminCard from '../app/components/admin-card/page';
import Card from '../app/components/card/page';
import HandleCategory from '../app/components/handleCategory/page';
import FetchProducts from './components/fetchProduct/page';
import StorageUser from './components/storageUser/page';
import FetchCategories from './components/fetchCategories/page';
import Basket from './components/basket/page';
import { ProductWithCategory } from './types/type';
import handleBasket from './components/handleBasket/page';
import FetchAdmin from './components/fetchAdmin/page';
import AddArticleForm from './components/addArticleForm/page';
import Navbar from '../app/components/navbar/NavBar';

export default function Home() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const memoizedFilter = useMemo(
    () => ({ categoryId: categoryFilter }),
    [categoryFilter],
  );

  const {
    basketItems,
    handleAddToBasket,
    handleRemoveFromBasket,
    handleClearBasket,
  } = handleBasket();

  const handleProductDelete = (id: number) => {
    setProducts((prevProducts) => {
      let filter = prevProducts.filter((product) => product.id !== id);
      return filter;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <StorageUser />
        <FetchAdmin setIsAdmin={setIsAdmin} />
        <FetchCategories
          setCategoryFilter={setCategoryFilter}
          setCategories={setCategories}
          categories={categories}
        />
        <FetchProducts
          setProducts={setProducts}
          setLoadingProducts={setLoadingProducts}
          filter={memoizedFilter}
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
                    onAddToBasket={handleAddToBasket}
                    onProductDelete={handleProductDelete}
                  />
                ) : (
                  <Card
                    key={product.id}
                    product={product}
                    onAddToBasket={handleAddToBasket}
                  />
                ),
              )}
              {isAdmin && <HandleCategory />}
            </div>
          </div>
        )}
        <div className="container mx-auto p-4">
          {isAdmin && <AddArticleForm />}
        </div>
        <div className="mt-8">
          <Basket
            items={basketItems}
            onRemove={handleRemoveFromBasket}
            onClear={handleClearBasket}
          />
        </div>
      </div>
    </div>
  );
}

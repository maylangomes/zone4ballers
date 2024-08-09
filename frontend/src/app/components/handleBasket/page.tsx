import { useEffect, useState } from 'react';
import { ProductWithCategory } from '@/app/types/type';

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const useBasket = () => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      // console.log('Loaded basket from localStorage:', JSON.parse(savedBasket));
      setBasketItems(JSON.parse(savedBasket));
    } else {
      // console.log('No basket found in localStorage');
    }
  }, []);

  const handleAddToBasket = (product: ProductWithCategory) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let updatedItems: BasketItem[];
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      localStorage.setItem('basket', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveFromBasket = (id: number) => {
    setBasketItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem('basket', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleClearBasket = () => {
    setBasketItems([]);
    localStorage.removeItem('basket');
  };

  return {
    basketItems,
    handleAddToBasket,
    handleRemoveFromBasket,
    handleClearBasket,
  };
};

export default useBasket;

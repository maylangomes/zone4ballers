export interface Category {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
}

export interface ProductWithCategory {
  id: number;
  name: string;
  description: string;
  price: number;
  details: string;
  stock: number;
  category_id: number;
  category: Category;
  color_id: number;
  color: Color;
  size: string;
  rating: number;
  country: string;
  is_available: boolean;
  is_new: boolean;
  is_promoted: boolean;
  store_id: number;
  click: string;
  franchise: string;
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
  color_id: number;
  color: Color;
  size: string;
  rating: number;
  country: string;
  is_available: boolean;
  is_new: boolean;
  is_promoted: boolean;
  store_id: number;
  click: string;
  franchise: string;
}

export interface CardProps {
  product: ProductWithCategory;
}

export interface FetchProductsProps {
  setProducts: (products: ProductWithCategory[]) => void;
  setLoadingProducts: (loading: boolean) => void;
  filter: {
    categoryId?: string | null;
  };
}

export interface FetchUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

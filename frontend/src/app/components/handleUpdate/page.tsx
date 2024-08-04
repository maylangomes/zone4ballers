import { Product } from "@/app/types/type";

interface HandleUpdateProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const HandleUpdate = ({ setProducts }: HandleUpdateProps) => {
  const handleUpdate = (id: number, updatedData: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product,
      ),
    );
  };

  return { handleUpdate };
};

export default HandleUpdate;
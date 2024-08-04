import { useRouter } from 'next/navigation';
import { CardProps } from '@/app/types/type';

export default function Card({ product }: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../detailsProducts/${product.id}`);
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price}</p>
      <p className="text-lg font-bold mb-4">
        Category: {product.category.name || 'No Category'}
      </p>
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
  );
}

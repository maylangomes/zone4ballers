import React from 'react';

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BasketProps {
  items: BasketItem[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

const Basket: React.FC<BasketProps> = ({ items, onRemove, onClear }) => {
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basket</h2>
      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 mb-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => onRemove(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </h3>
            <button
              onClick={onClear}
              className="bg-teal-500 text-white px-4 py-2 rounded mt-4"
            >
              Clear Basket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;

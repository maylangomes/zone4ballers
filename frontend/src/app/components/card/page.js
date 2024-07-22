export default function Card({ product }) {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.features}</p>
            <p>{product.price} €</p>
            <button>Buy</button>
        </div>
    );
}
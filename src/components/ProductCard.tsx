import { useCartStor } from "../store/cartStore";
import type { Product } from "../type/Product";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const addToCart = useCartStor((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 🛑 Link'e gitmesini engeller
    addToCart(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="block border p-4 rounded shadow hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-32 mx-auto object-contain"
      />
      <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
      <p className="text-green-600 font-bold">${product.price}</p>
      <button
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Sepete Ekle
      </button>
    </Link>
  );
};

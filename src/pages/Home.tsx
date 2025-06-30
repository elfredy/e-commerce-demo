import { useEffect } from "react";
import { useProductStore } from "../store/ProductStore";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

import { useProductStore } from "../store/ProductStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();
  const { selectedProduct, getProductById } = useProductStore();

  useEffect(() => {
    if (id) {
      getProductById(Number(id));
    }
  }, [id]);

  if (!selectedProduct) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        className="h-64 mx-auto object-contain"
      />
      <h1 className="text-2xl font-bold mt-4">{selectedProduct.title}</h1>
      <p className="text-gray-600">{selectedProduct.description}</p>
      <p className="text-green-600 font-bold mt-2">${selectedProduct.price}</p>
    </div>
  );
};

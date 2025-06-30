import { create } from "zustand";
import type { Product } from "../type/Product.d.ts";
import axios from "axios";

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  getProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  selectedProduct: null,

  getProducts: async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    const data = await res.data;
    set({ products: data });
  },

  getProductById: async (id: number) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const data = await res.data;
    set({ selectedProduct: data });
  },
}));

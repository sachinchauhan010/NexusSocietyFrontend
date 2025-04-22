import { useEffect, useState } from "react";

import Loader from "../../Loader";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/productType";


function ProductList() {

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/get-products`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setProducts(data.productsData || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

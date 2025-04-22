import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import Marquee from "react-fast-marquee";
import Loader from "../Loader";


function MerchandiseList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/get-products`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setProducts(data.productsData || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally{
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
    <div className="w-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-6">
        Exclusive Nexus
        <span className="text-purple-500">  Wear & Gear</span>
      </h1>
      <Marquee speed={100} className="w-full" style={{ overflow: "hidden" }}>
        {products.map((product) => (
          <div key={product.id} className="mx-4 w-[250px] h-[400px]">
            <ProductCard product={product} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default MerchandiseList;

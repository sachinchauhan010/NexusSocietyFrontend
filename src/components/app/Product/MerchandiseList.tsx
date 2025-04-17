import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import Marquee from "react-fast-marquee";

function MerchandiseList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {" "}
      {/* 👈 yaha overflow-hidden likhna zaroori tha */}
      <Marquee
        speed={100}
        className="w-full"
        style={{ overflow: "hidden" }} // 👈 extra safety
      >
        {products.map((product) => (
          <div key={product.id} className="mx-4">
            <ProductCard product={product} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default MerchandiseList;

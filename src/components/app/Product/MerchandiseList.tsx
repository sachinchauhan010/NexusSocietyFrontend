import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import Marquee from "react-fast-marquee";


function MerchandiseList() {
   const [products, setProducts] = useState<ProductType[]>([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
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
        }
      };
  
      fetchProducts();
    }, []);

  return (
    <div>
      <Marquee speed={100}>
        {products.map((product) => (
          <div key={product.id} className="mx-4">
            <ProductCard product={product} /> {/* Pass a single product here */}
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default MerchandiseList

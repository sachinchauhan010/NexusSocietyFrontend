import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "@/types/productType";

function ProductDetail() {
  const { id } = useParams(); // Fetch the product ID from the route params
  const [product, setProduct] = useState<ProductType| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data.productData);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {product ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-2">Category: {product.category}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700 mb-4">{product.stock}</p>
          <p className="text-gray-700 mb-4">{product.upload_date}</p>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      ) : (
        <div>No product details available.</div>
      )}
    </div>
  );
}

export default ProductDetail;
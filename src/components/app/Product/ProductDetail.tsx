import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
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
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-10 justify-center items-center mt-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center ">
        <motion.img
          src={product?.image}
          alt={product?.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-xl shadow-lg object-cover max-h-[500px]"
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-purple-800">
            {product?.name}
          </h1>

          <p className="text-lg text-gray-700">{product?.description}</p>

          <div className="flex items-center gap-4 mt-6 relative">
            <p className="text-2xl text-gray-700 line-through">
              ₹{Number(product?.price || 0)}
            </p>

            <p className="text-4xl sm:text-5xl font-semibold text-purple-600">
              ₹{(Number(product?.price || 0) * 0.7).toFixed(0)}
            </p>

            <div className="relative">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="ml-2 px-4 py-1 rounded-full bg-green-200 text-green-800 text-2xl font-bold shadow-md"
              >
                ₹{(Number(product?.price || 0) * 0.3).toFixed(0)} OFF
              </motion.div>
            </div>
          </div>

          <div className="text-lg text-gray-700 space-y-1">
            <p>
              <span className="font-medium text-gray-700">Category:</span>{" "}
              {product?.category}
            </p>
            <p>
              <span className="font-medium text-gray-700">Stock:</span>{" "}
              {product?.stock}
            </p>
            <p>
              <span className="font-medium text-gray-700">Uploaded:</span>{" "}
              {product?.upload_date}
            </p>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetail;

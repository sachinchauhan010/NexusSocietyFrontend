import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function AllUserMerchandise() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen px-4 sm:px-10 py-12 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-gray-800 mb-12"
      >
        Shop The Latest <span className="text-purple-600">Merchandise</span>
      </motion.h1>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-lg"
        >
          Loading your merch...
        </motion.div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={product.image || "/product-placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-purple-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-400">
                    {product.category}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  Stock: <span className="font-medium">{product.stock}</span>
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all">
                  <ShoppingCart size={16} />
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default AllUserMerchandise;

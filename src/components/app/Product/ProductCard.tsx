import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link to={`/merchandise/${product.id}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-sm mx-auto cursor-pointer"
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
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-700 font-bold text-lg">${product.price}</span>
          <span className="text-sm text-gray-400">{product.category}</span>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Stock: <span className="font-medium">{product.stock}</span>
        </div>
      </div>
    </motion.div>
      </Link>
  );
}

export default ProductCard;

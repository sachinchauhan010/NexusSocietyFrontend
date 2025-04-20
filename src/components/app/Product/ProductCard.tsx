import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react"; 

function ProductCard({ product }: { product: ProductType }) {
  const [readMore, setReadMore] = useState(false);
  const descriptionLimit = 100;

  const toggleReadMore = () => setReadMore(!readMore);

  return (
    <Link to={`/merchandise/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white shadow-md rounded-2xl overflow-hidden w-full min-w-[260px] h-[430px] mx-auto cursor-pointer flex flex-col justify-between"
      >
        {/* Image */}
        <div className="w-full h-52 flex items-center justify-center bg-gray-100">
          <img
            src={product.image || "/product-placeholder.jpg"}
            alt={product.name}
            className="h-full w-auto object-contain transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {product.name}
          </h3>

          {/* Description with Read More */}
          <p className="text-sm text-gray-500 mt-1">
            {readMore || product.description.length <= descriptionLimit
              ? product.description
              : `${product.description.slice(0, descriptionLimit)}... `}
            {product.description.length > descriptionLimit && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  toggleReadMore();
                }}
                className="text-blue-500 cursor-pointer ml-1"
              >
                {readMore ? "Read Less" : "Read More"}
              </span>
            )}
          </p>

          {/* Price & Category */}
          <div className="mt-2 flex justify-between items-center">
            <span className="text-purple-700 font-bold text-lg">
              ₹{product.price}
            </span>
            <span className=" text-purple-500">{product.category}</span>
          </div>

          {/* Stock Info */}
          <div className="mt-1 text-s text-gray-900">
            Stock: <span className="font-medium">{product.stock}</span>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="px-4 pb-12">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm flex items-center justify-center gap-2">
            <ShoppingCart size={16} />
            Buy Now
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { OrderType } from "@/types/orderType";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authState } = useAuth();

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

  const handleOrder = async () => {
    if (!authState?.email) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/order/create-order`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [
              {
                productId: product?.id,
                name: product?.name,
                price: product?.price,
                quantity: 1,
                image: product?.image,
              }
            ],
            user: authState.email,
            paymentInfo: {
              method: "COD",
              status: "Pending",
            },
            totalAmount: product?.price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      setOrder(data.orderData);
      toast.message("Order is being processed...");

      if(data.paymentInfo.status !== "Pending") {
        toast.message("please Payment for place the Order")
      }

      if(data.paymentInfo.status === "Success") {
        toast.success("Order placed successfully!");
      }

    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  console.log(order, "order data");

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
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {product?.name}
          </h1>

          <p className="text-lg text-gray-700">{product?.description}</p>

          <div className="flex items-center relative">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-600">
              ₹{Number(product?.price || 0).toFixed(0)}
            </p>
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

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
            onClick={handleOrder}
          >
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductDetail;
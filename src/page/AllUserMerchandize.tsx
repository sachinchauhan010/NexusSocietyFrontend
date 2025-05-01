import { useEffect, useState } from "react";
import { ProductType } from "@/types/productType";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {toast} from "sonner"
import { User } from "@/types/userType";


function ProductShowcase() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const {authState} = useAuth();
  const [userDetails, setUserDetails] = useState<User>();

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
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchUserDetails = async () => {
    if(!authState.isLoggedIn) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/auth/${authState.email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if(!res.ok) {
        toast.error("Failed to fetch user details.");
        return;
      }
      const data = await res.json();
      setUserDetails(data.userData || {});

    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch user details.");
    }
  };


  const handleBuyNow = async (product: ProductType) => {
    if(!authState.isLoggedIn){
      toast.error("Please login to buy the product.");
      return;
    }
    fetchUserDetails();
    const orderPayload = {
      user: userDetails?.email || "",
      products: [
        {
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      ],
      paymentInfo: {
        method: "online",
      },
      totalAmount: product.price,
      phone: userDetails?.phone || "", 
      name: userDetails?.name ?? "", 
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/order/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(orderPayload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Something went wrong while creating order.");
        return;
      }

      const razorpayScript = document.createElement("script");
      razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      razorpayScript.async = true;
      document.body.appendChild(razorpayScript);
      console.log(import.meta.env.VITE_PRODUCTION_RAZORPAY_KEY_ID, "########")

      razorpayScript.onload = () => {
        const options = {
          key: import.meta.env.VITE_PRODUCTION_RAZORPAY_KEY_ID,
          amount: Number(product.price) * 100,
          currency: "INR",
          name: "Grub Express",
          description: "Order Payment",
          image: "/logo.png", // TODO: use logo
          order_id: data.orderData.orderId,
          handler: function (response: any) {
            fetch(`${import.meta.env.VITE_PRODUCTION_API_URI}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(response),
            })
              .then((res) => res.json())
              .then((verifyData) => {
                if (verifyData.success) {
                  toast.success("Payment Successful!");
                } else {
                  toast.error("Payment verification failed.");
                }
              }).then(() => {
                toast.success("Payment Successful!");
              });
          },
          prefill: {
            name: orderPayload.name,
            email: orderPayload.user,
            contact: orderPayload.phone,
          },
          theme: { color: "#8b5cf6" },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };
    } catch (err) {
      console.error("Error creating order or initiating payment:", err);
      toast.error("Something went wrong, please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-500">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-gray-400">
        No products available.
      </div>
    );
  }

  return (
    <div className="w-full">
      {products.map((product, index) => (
        <section
          key={product.id}
          className={`min-h-[60vh] flex ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            } items-center justify-center gap-10 px-6 md:px-20 py-10 bg-gradient-to-b from-white via-gray-50 to-gray-100`}
        >
          <motion.img
            src={product.image || "/product-placeholder.jpg"}
            alt={product.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-sm rounded-2xl shadow-xl object-cover"
          />

          <motion.div
            className="max-w-xl flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-purple-600 font-semibold text-xl">
                ₹{product.price}
              </span>
              <span className="text-xs text-gray-400">{product.category}</span>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Stock: <span className="font-medium">{product.stock}</span>
            </div>

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg flex items-center gap-2 transition-all w-fit"
              onClick={() => handleBuyNow(product)}
            >
              <ShoppingCart size={16} />
              Buy Now
            </button>
          </motion.div>
        </section>
      ))}
    </div>
  );
}

export default ProductShowcase;

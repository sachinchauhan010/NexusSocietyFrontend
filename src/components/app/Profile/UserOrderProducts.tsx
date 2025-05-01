import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function UserOrderProducts() {
  const [orders, setOrders] = useState<any>([]);
  const { authState } = useAuth(); // Use useAuth only once
  const userEmail = authState?.email; // Safely access email

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        console.warn("User email is not available.");
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_PRODUCTION_API_URI}/api/order/get-orders`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              user: userEmail,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        toast.success(data.message || "Orders fetched successfully!");
        setOrders(data.orderData || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, [userEmail]); // Add userEmail as a dependency

  console.log(orders)
  return <div>
    Orders check
    <div>{orders.map((order: any, index: number) => (
      <div key={index}>
        <h3>Order ID: {order._id}</h3>
        <p>Product Name: {order.productName}</p>
        <p>Price: {order.price}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Status: {order.status}</p>
      </div>
    ))}</div>
  </div>
}

export default UserOrderProducts;

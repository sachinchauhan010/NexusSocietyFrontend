import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function UserOrderProducts() {
  const [orders, setOrders] = useState<any[]>([]);
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

  console.log(orders);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.orderId} className="border rounded-md overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-lg">Order ID: {order.orderId}</h3>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <p className="text-sm text-gray-500">Amount: ₹{order.amount}</p>
              <p className="text-sm text-gray-500">Created At: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="border-t">
              {order.notes?.products?.length > 0 ? (
                order.notes.products.map((product: any, index: number) => (
                  <div key={index} className="flex p-4 gap-4 border-b last:border-b-0">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-medium text-sm sm:text-base">{product.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">No products found for this order.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserOrderProducts;
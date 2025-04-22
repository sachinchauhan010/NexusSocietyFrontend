export type OrderType = {
  _id?: string; // Optional if not returned yet
  user: string; // User email or ID
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  paymentInfo: {
    method: string; // e.g., "Online", "COD"
    status: "Pending" | "Success" | "Failed"; // Payment status
    transactionId?: string;
  };
  totalAmount: number;
  deliveryStatus: "Processing" | "Delivered";
  deliveryDate?: string; // ISO string or Date
  createdAt?: string; // ISO string or Date
  updatedAt?: string; // ISO string or Date
};

export type User = {
  _id: string;  // ObjectId as string
  name: string;
  email: string;
  phone: string;
  role: string[];  // Array of roles
  id: string;  // Custom ID (e.g., student number)
  department: string;
  year: number;
};

import { motion } from "framer-motion";
import { ProductType } from "@/types/productType";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

function ProductCard({ product }: { product: ProductType }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: product,
  });

  const handleUpdate = () => {
    reset(product);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/delete-product/${product.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("✅ Product deleted successfully!");
      } else {
        toast.error("❌ Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("❌ Something went wrong.");
    }
  };

  const handleUpdateSubmit = async (data: ProductType) => {
    try {
      const hasChanges = JSON.stringify(data) !== JSON.stringify(product);

      if (!hasChanges) {
        toast.info("No changes detected.");
        setOpen(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/update-product/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      const apiData = await response.json();
      console.log(apiData, "Updated Product");

      toast.success("✅ Product updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("❌ Something went wrong while updating the product.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto cursor-pointer"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={product.image || "/product-placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-700 font-bold text-lg">${product.price}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-gray-500">
                <HiDotsVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-700 hover:bg-blue-500">Update Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl">
            <form onSubmit={handleSubmit(handleUpdateSubmit)} className="w-full">
              <div className="grid gap-x-20 gap-y-4 md:grid-cols-2 max-w-5xl mx-auto py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" {...register("price")} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" {...register("category")} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" {...register("stock")} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="upload_date">Upload Date</Label>
                  <Input id="upload_date" type="date" {...register("upload_date")} />
                </div>
              </div>

              <div className="flex flex-col gap-2 max-w-5xl mx-auto py-4">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
              </div>

              <div className="flex justify-center py-4">
                <Button type="submit" className="bg-blue-700 sm:w-1/2 md:w-1/4 w-full">
                  Update Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}

export default ProductCard;

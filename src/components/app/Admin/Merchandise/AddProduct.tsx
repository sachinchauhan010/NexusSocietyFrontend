"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  id: string;
  upload_date: string;
  image: FileList;
};

export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      // Dynamically append all form fields to FormData
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof ProductFormValues];
        if (key === "image" && value instanceof FileList) {
          formData.append(key, value[0]); // Append the first file
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_API_URI}/api/product/add-product`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit product.");
      }
      const apiData = await response.json();
      console.log(apiData, "APIIIIIII")

      toast.success("✅ Product added successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Something went wrong while adding the product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-700 hover:bg-blue-500">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid gap-x-20 gap-y-4 md:grid-cols-2 max-w-5xl mx-auto py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="id">Product ID</Label>
                <Input
                  id="id"
                  placeholder="Enter product ID"
                  {...register("id", { required: "ID is required" })}
                />
                {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Enter product price"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category"
                  {...register("category", { required: "Category is required" })}
                />
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Enter available stock"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,
                  })}
                />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="upload_date">Upload Date</Label>
                <Input
                  id="upload_date"
                  type="date"
                  {...register("upload_date", { required: "Upload Date is required" })}
                />
                {errors.upload_date && (
                  <p className="text-red-500 text-sm">{errors.upload_date.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="image">Upload Product Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-5xl mx-auto py-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-center py-4">
              <Button type="submit" className="bg-blue-700 sm:w-1/2 md:w-1/4 w-full">
                Submit Product
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
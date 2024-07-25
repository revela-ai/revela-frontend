import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  productType: z.string().min(1, {
    message: "Product type is required.",
  }),
  productBrand: z.string().min(1, {
    message: "Product brand is required.",
  }),
  activeIngredients: z.string().min(1, {
    message: "Active ingredients are required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  suitableForSkinType: z.string().min(1, {
    message: "Suitable skin type is required.",
  }),
});

export default function AddSingleProduct() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productType: "",
      productBrand: "",
      activeIngredients: "",
      description: "",
      suitableForSkinType: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const newProduct = {
        "Product Name": values.productName,
        "Product Type": values.productType,
        "Product Brand": values.productBrand,
        "Active Ingredients": values.activeIngredients,
        Description: values.description,
        "Suitable for what Skin Type": values.suitableForSkinType,
      };

      const bulkProducts = JSON.parse(
        localStorage.getItem("bulkProducts") || "[]"
      );
      bulkProducts.push(newProduct);
      localStorage.setItem("bulkProducts", JSON.stringify(bulkProducts));

      toast({
        title: "Product added successfully",
      });

      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:mt-8"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Facial Cleanser" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Cleanser" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="productBrand"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Product Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Sample Brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activeIngredients"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Active Ingredients</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ceramides, Hyaluronic Acid"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cleanser that cleanses, hydrates, and helps restore the protective skin barrier."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suitableForSkinType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Suitable for Skin Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Dry Skin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full lg:w-[323px] mx-auto"
            >
              {isLoading ? "Adding Product..." : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

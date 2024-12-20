"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ListFilter,
  LucideSquareX,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BatchImport from "@/components/batch-import-product";
import { Input } from "@/components/ui/input";
import AddSingleProduct from "@/components/add-single-product";
import { getCookie } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  name: string;
  type: string;
  brand: string;
  active_ingredients: string;
  description: string;
  skin_suitability: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const savedProducts = localStorage.getItem("bulkProducts");
        const lastUpdated = localStorage.getItem("productsLastUpdated");
        const now = new Date().getTime();

        if (
          savedProducts &&
          lastUpdated &&
          now - parseInt(lastUpdated, 10) < 7 * 24 * 60 * 60 * 1000
        ) {
          setProducts(JSON.parse(savedProducts));
        } else {
          const accessToken = getCookie("access_token");
          const response = await fetch(
            "https://quantum-backend-sxxx.onrender.com/products/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setProducts(data);
          localStorage.setItem("bulkProducts", JSON.stringify(data));
          localStorage.setItem("productsLastUpdated", now.toString());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 mt-4 sm:px-6 sm:py-0">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="relative me-auto flex-1 md:grow-0 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex ms-auto justify-center items-center">
                  <Button
                    size="sm"
                    className="h-8 gap-1 bg-transparent border border-primary text-primary hover:text-white hover:bg-primary"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center">
                    <AlertDialogTitle>Product Details</AlertDialogTitle>
                    <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                      <LucideSquareX />
                    </AlertDialogCancel>
                  </div>
                  <AlertDialogDescription>
                    Fill the form below to add your products one by one
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AddSingleProduct />
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex ms-auto justify-center items-center">
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Batch Import Products
                    </span>
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <div className="flex items-center">
                    <AlertDialogTitle>Batch Import Products</AlertDialogTitle>
                    <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                      <LucideSquareX />
                    </AlertDialogCancel>
                  </div>
                  <AlertDialogDescription>
                    Kindly download the provided sample file, complete the
                    necessary details, upload it to efficiently add Products in
                    batches. Supported file formats include xlsx.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <BatchImport />
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <TabsContent value="all">
          {isLoading ? (
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>{error}</Card>
          ) : (
            <Card x-chunk="dashboard-06-chunk-0" className="w-[92vw] md:w-full">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Ingredients</TableHead>
                        <TableHead>Suitable Skin</TableHead>
                        <TableHead>Date added</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="hidden sm:table-cell">
                            <Avatar>
                              <AvatarImage src="" alt={product.name} />
                              <AvatarFallback>
                                {String(product.name).charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Active</Badge>
                          </TableCell>
                          <TableCell width="300px">
                            {String(product.description)}
                          </TableCell>
                          <TableCell>{product.active_ingredients}</TableCell>
                          <TableCell>{product.skin_suitability}</TableCell>
                          <TableCell>
                            {new Date().toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>{products.length}</strong> of{" "}
                  <strong>{products.length}</strong> products
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}

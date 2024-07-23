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
import CustomerDetailsForm from "@/components/customer-details-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BatchImport from "@/components/batch-import-product";
import { Input } from "@/components/ui/input";

interface Product {
  "Product Name": string;
  "Product Type": string;
  "Product Brand": string;
  "Active Ingredients": string;
  Description: string;
  "Suitable for what Skin Type": string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("bulkProducts");

    const parsedProducts: Product[] = savedProducts
      ? JSON.parse(savedProducts)
      : [];

    setProducts(parsedProducts);
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
                  <Button size="sm" className="h-8 gap-1">
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
                    Please take a moment to input your details
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <CustomerDetailsForm />
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex ms-auto justify-center items-center">
                  <Button
                    size="sm"
                    className="h-8 gap-1 bg-transparent border border-primary text-primary hover:text-white hover:bg-primary"
                  >
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
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
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
                          <AvatarImage src="" alt={product["Product Name"]} />
                          <AvatarFallback>
                            {String(product["Product Name"]).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product["Product Name"]}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell width="300px">
                        {String(product["Description"])}
                      </TableCell>
                      <TableCell>{product["Active Ingredients"]}</TableCell>
                      <TableCell>
                        {product["Suitable for what Skin Type"]}
                      </TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
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
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{products.length} - 10</strong> of{" "}
                <strong>{products.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

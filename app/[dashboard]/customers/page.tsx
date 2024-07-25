"use client";

import React, { useEffect, useState } from "react";
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
import { ListFilter, MoreHorizontal, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Scan from "@/components/scan";
import { Input } from "@/components/ui/input";

interface Customer {
  id: number;
  name: string;
  telephone: string;
  analysis: {
    analysis_id: [string, number];
    skin_type: [string, number];
    skin_acne: [string, number];
    skin_age: [string, number]
  };
  created_at: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    const storedData = localStorage.getItem("customers");
    const storedCustomers: Customer[] = storedData
      ? JSON.parse(storedData)
      : [];
    setCustomers(storedCustomers);
  }, []);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

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
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Scan
              className="w-3.5 h-3.5"
              buttonTitle="Scan customer"
              buttonClass="text-sm p-4 rounded-lg"
            />
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            {selectedCustomer ? (
              <>
                <CardHeader>
                  <CardTitle>{selectedCustomer.name}</CardTitle>
                  <CardDescription>
                    Detailed analysis of the customer&apos;s scan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Analysis ID</TableHead>
                        <TableHead>Skin Type</TableHead>
                        <TableHead>Skin Condition</TableHead>
                        <TableHead>Skin Age</TableHead>
                        <TableHead>Last Scan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {selectedCustomer.analysis.analysis_id}
                        </TableCell>
                        <TableCell>
                          {selectedCustomer.analysis.skin_type[0]}
                        </TableCell>
                        <TableCell>
                          Skin Acne {selectedCustomer.analysis.skin_acne[0]}
                        </TableCell>
                        <TableCell>
                          {selectedCustomer.analysis.skin_age[0]} years old
                        </TableCell>
                        <TableCell>
                          {new Date(
                            selectedCustomer.created_at
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setSelectedCustomer(null)}>
                    Back to Customers
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle>Customers</CardTitle>
                  <CardDescription>
                    Manage your customers, view and compare their skin analysis.
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
                        <TableHead>Phone</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Skin Type
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Skin Condition
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Last Scan
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer: Customer, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="hidden sm:table-cell">
                            <Avatar>
                              <AvatarImage src="" alt="@shadcn" />
                              <AvatarFallback>
                                {customer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {customer.name}
                          </TableCell>
                          <TableCell>{customer.telephone}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {customer.analysis.skin_type[0]}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {customer.analysis.skin_acne[0]}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(customer.created_at).toLocaleString()}
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
                                <DropdownMenuItem
                                  onClick={() => handleViewCustomer(customer)}
                                >
                                  View
                                </DropdownMenuItem>
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
                    Showing <strong>{customers.length}</strong> of{" "}
                    <strong>{customers.length}</strong> customers
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

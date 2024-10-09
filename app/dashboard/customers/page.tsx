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
import { getCookie } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Customer {
  id: number;
  name: string;
  telephone: string;
  email: string;
  date_of_birth: string;
  address: string;
  country_of_origin: string;
  created_at: string;
  updated_at: string;
  business: string;
  faces_analysis: { id: number }[];
}

interface Analysis {
  image_url: string;
  rating: number;
  comment: string | null;
  result: {
    faces: {
      face_id: string;
      accuracy: number;
      skin_tone: string;
      tone_label: string;
      dominant_colors: { color: string; percent: string }[];
    }[];
    skin_age: [string, number, string];
    skin_acne: [string, number, string];
    skin_type: [string, number, string];
    skin_wrinkle: [string, number, string];
  };
  created_at: string;
}

interface CustomerWithAnalysis extends Customer {
  analysis?: Analysis;
}

const API_BASE_URL = "https://quantum-backend-sxxx.onrender.com";


export default function Customers() {
  const [customers, setCustomers] = useState<CustomerWithAnalysis[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerWithAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const accessToken = getCookie("access_token");
        const response = await fetch(`${API_BASE_URL}/customers/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data: Customer[] = await response.json();

        const customersWithAnalysis = await Promise.all(
          data.map(async (customer) => {
            const analysis = await fetchAnalysis(customer.id);
            return { ...customer, analysis };
          })
        );

        setCustomers(customersWithAnalysis);
      } catch (err) {
        setError("Error fetching customers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const fetchAnalysis = async (
    customerId: number
  ): Promise<Analysis | undefined> => {
    try {
      const accessToken = getCookie("access_token");
      const response = await fetch(
        `${API_BASE_URL}/analysis/customer/${customerId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) return undefined;
      const analysisData: Analysis[] = await response.json();
      return analysisData[0];
    } catch (err) {
      console.error(`Error fetching analysis for customer ${customerId}:`, err);
      return undefined;
    }
  };

  const handleViewCustomer = (customer: CustomerWithAnalysis) => {
    setSelectedCustomer(customer);
  };

  if (error) return <div>Error: {error}</div>;

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
          <div className="ml-auto">
            <DropdownMenu>
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
        {loading ? (
          <div className="border rounded-xl p-4 shadow-sm mt-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
            </div>
          </div>
        ) : (
          <TabsContent value="all">
            <Card className="w-[92vw] lg:w-full">
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
                          <TableHead>Skin Type</TableHead>
                          <TableHead>Skin Condition- Acne</TableHead>
                          <TableHead>Skin Age</TableHead>
                          <TableHead>Wrinkles</TableHead>
                          <TableHead>Last Scan</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCustomer.analysis ? (
                          <TableRow>
                            <TableCell>
                              {selectedCustomer.analysis.result.skin_type[0]}
                            </TableCell>
                            <TableCell>
                              {selectedCustomer.analysis.result.skin_acne[0]}
                            </TableCell>
                            <TableCell>
                              {selectedCustomer.analysis.result.skin_age[0]}
                            </TableCell>
                            <TableCell>
                              {selectedCustomer.analysis.result.skin_wrinkle[0]}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                selectedCustomer.analysis.created_at
                              ).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5}>
                              No analysis data available
                            </TableCell>
                          </TableRow>
                        )}
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
                      Manage your customers, view and compare their skin
                      analysis.
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
                          <TableHead>Email</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead>Last Scan</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customers.map((customer) => (
                          <TableRow key={customer.id}>
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
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.country_of_origin}</TableCell>
                            <TableCell>
                              {customer.analysis
                                ? new Date(
                                    customer.analysis.created_at
                                  ).toLocaleString()
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-label="Open menu"
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
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
        )}
      </Tabs>
    </main>
  );
}

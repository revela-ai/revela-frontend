"use client";

import { fetchBusinessDetails, getCookie } from "@/utils/utils";
import {
  LucideBuilding2,
  LucidePackage,
  LucideScanFace,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface ScansResponse {
  total_scans: number;
}

interface Business {
  email: string;
  name: string;
  website: string | null;
  registration: string | null;
  referal_link: string | null;
  is_active: boolean;
  is_verified: boolean;
}

export default function CustomerDetailsBanner() {
  const [email, setEmail] = useState<string | null>(null);
  const [totalScans, setTotalScans] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [customers, setCustomers] = useState<number>(0);
  const [businessName, setBusinessName] = useState<string>("");

  useEffect(() => {
    // Check if running in a browser environment
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("userEmail");
      setEmail(email);

      const savedProducts = JSON.parse(
        localStorage.getItem("bulkProducts") || "[]"
      );
      const savedCustomers = JSON.parse(
        localStorage.getItem("customers") || "[]"
      );

      setProducts(savedProducts.length);
      setCustomers(savedCustomers.length);

      const fetchBusinessName = async (email: string) => {
        try {
          const storedBusiness = localStorage.getItem("businessDetails");
          if (storedBusiness) {
            const businessDetails: Business = JSON.parse(storedBusiness);
            setBusinessName(businessDetails.name);
          } else {
            const businessDetails = await fetchBusinessDetails(email);
            localStorage.setItem(
              "businessDetails",
              JSON.stringify(businessDetails)
            );
            setBusinessName(businessDetails.name);
          }
        } catch (error) {
          console.error("Failed to fetch business details:", error);
        }
      };

      if (email) {
        fetchBusinessName(email);
      } else {
        console.error("Email is null, cannot fetch business details");
      }
    }
  }, []);

  useEffect(() => {
    if (email) {
      const fetchTotalScans = async () => {
        try {
          const accessToken = getCookie("access_token");

          const headers: HeadersInit = {
            "Content-Type": "application/json",
          };

          if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
          }

          const response = await fetch(
            "https://quantum-backend-sxxx.onrender.com/dashboard/scans/total/",
            {
              method: "GET",
              headers: headers,
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data: ScansResponse = await response.json();
          setTotalScans(data.total_scans);
        } catch (error) {
          console.error("Failed to fetch total scans:", error);
        }
      };

      fetchTotalScans();
    }
  }, [email]);

  return (
    <>
      <div className="hidden lg:flex w-full justify-between items-end h-[198px] bg-[url('/images/dashboard-image.svg')] p-8 bg-cover border rounded-3xl mx-auto">
        <div className="flex gap-2 items-center">
          <div className="border-2 border-black p-4 rounded-full">
            <LucideBuilding2 className="text-black" />
          </div>
          <div>
            <p className="font-bold">{businessName}</p>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-2 border-black p-4 rounded-full">
            <LucideScanFace className="text-black" />
          </div>
          <div>
            <p className="font-bold">Scans</p>
            <p className="text-sm">{totalScans} scans</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-2 border-black p-4 rounded-full">
            <LucidePackage className="text-black" />
          </div>
          <div>
            <p className="font-bold">Products</p>
            <p className="text-sm">{products}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="border-2 border-black p-4 rounded-full">
            <Users className="text-black" />
          </div>
          <div>
            <p className="font-bold">Customers</p>
            <p className="text-sm">{customers}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        <div className="h-40 w-48 shadow-lg bg-primary text-white rounded-lg p-4 flex flex-col">
          <div className="border-2 border-white p-2 h-10 w-10 flex items-center rounded-full">
            <LucideBuilding2 className="text-white" />
          </div>
          <div className="mt-auto">
            <p className="font-bold">{businessName}</p>
            <p className="text-xs">{email}</p>
          </div>
        </div>
        <div className="h-40 w-48 shadow-lg border border-primary text-primary rounded-lg p-4 flex flex-col">
          <div className="border-2 border-primary p-2 h-10 w-10 ms-auto flex items-center rounded-full">
            <Users className="text-primary" />
          </div>
          <div className="mt-auto">
            <p className="font-bold text-end">Customers</p>
            <p className="text-xs text-end">{customers}</p>
          </div>
        </div>
        <div className="h-40 w-48 shadow-lg border border-primary text-primary rounded-lg p-4 flex flex-col">
          <div className="border-2 border-primary p-2 h-10 w-10 flex items-center rounded-full">
            <LucideScanFace className="text-primary" />
          </div>
          <div className="mt-auto">
            <p className="font-bold">Scans</p>
            <p className="text-xs">{totalScans}</p>
          </div>
        </div>
        <div className="h-40 w-48 shadow-lg bg-primary text-white rounded-lg p-4 flex flex-col">
          <div className="border-2 border-white p-2 h-10 w-10 ms-auto flex items-center rounded-full">
            <LucidePackage className="text-white" />
          </div>
          <div className="mt-auto">
            <p className="font-bold text-end">Products</p>
            <p className="text-xs text-end">{products}</p>
          </div>
        </div>
      </div>
    </>
  );
}

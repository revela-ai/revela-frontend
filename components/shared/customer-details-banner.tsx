"use client";

import { LucideBuilding2, LucidePackage, LucideScanFace } from "lucide-react";
import React, { useEffect, useState } from "react";

const getCookie = (name: string) => {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
interface ScansResponse {
  total_scans: number;
}

export default function CustomerDetailsBanner() {
  const [totalScans, setTotalScans] = useState<number>(0);
  const [products, setProducts] = useState<number>(0);
  const [customers, setCustomers] = useState<number>(0);

  useEffect(() => {
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
        console.log(`Total: ${data.total_scans}`)
        console.log(accessToken)
      } catch (error) {
        console.error("Failed to fetch total scans:", error);
      }
    };

    const savedProducts = JSON.parse(
      localStorage.getItem("bulkProducts") || "[]"
    );
    const savedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    );

    setProducts(savedProducts.length);
    setCustomers(savedCustomers.length);

    fetchTotalScans();
  }, []);

  return (
    <div className="hidden lg:flex w-full justify-between items-end h-[198px] bg-[url('/images/dashboard-image.svg')] p-8 bg-cover border rounded-3xl mx-auto">
      <div className="flex gap-2 items-center">
        <div className="border-2 border-black p-4 rounded-full">
          <LucideBuilding2 className="text-black" />
        </div>
        <div>
          <p className="font-bold">Luxury Spa</p>
          <p className="text-sm">North Legon</p>
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
          <LucidePackage className="text-black" />
        </div>
        <div>
          <p className="font-bold">Customers</p>
          <p className="text-sm">{customers}</p>
        </div>
      </div>
    </div>
  );
}

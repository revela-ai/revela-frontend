"use client";

import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { LucideDownload, LucideUpload } from "lucide-react";
import { Input } from "./ui/input";
import * as XLSX from "xlsx";
import { useToast } from "./ui/use-toast";
import { getCookie } from "@/utils/utils";

export default function BatchImport() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    const accessToken = getCookie("access_token");
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const transformedProducts = jsonData.map((product: any) => ({
          name: product["Product Name"],
          type: product["Product Type"],
          brand: product["Product Brand"],
          active_ingredients: product["Active Ingredients"] || "",
          description: product["Description"],
          skin_suitability: product["Suitable for what Skin Type"],
        }));

        setIsLoading(true);
        const failedProducts = [];

        for (const product of transformedProducts) {
          try {
            const response = await fetch(
              "https://quantum-backend-sxxx.onrender.com/products/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(product),
              }
            );

            if (!response.ok) {
              const errorDetail = await response.text();
              console.error(`Error adding product: ${errorDetail}`);
              failedProducts.push(product);
              continue;
            }

            const responseData = await response.json();
          } catch (error) {
            console.error("Network error:", error);
            failedProducts.push(product);
          }
        }

        const existingBulkProducts = JSON.parse(
          localStorage.getItem("bulkProducts") || "[]"
        );

        const combinedProducts = [
          ...existingBulkProducts,
          ...transformedProducts,
        ];
        localStorage.setItem("bulkProducts", JSON.stringify(combinedProducts));

        if (failedProducts.length > 0) {
          toast({
            title: "Some products failed to upload",
            description: `${failedProducts.length} out of ${transformedProducts.length} failed.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "All products uploaded successfully",
          });
        }

        setIsLoading(false);
        window.location.reload();
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div>
        <p className="text-sm">
          Step 1: Download the template and then edit with your products
        </p>
        <Button
          className="w-full mt-2"
          onClick={() => window.open("/templates/product-sample-template.xlsx")}
        >
          <LucideDownload className="mr-2" />
          Download the template
        </Button>
      </div>
      <div>
        <p className="text-sm">Step 2: Upload the edited file</p>
        <div className="grid w-full items-center gap-1.5">
          <Input
            id="file-input"
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button
            className="w-full mt-2 bg-transparent text-primary hover:text-white border border-primary"
            onClick={triggerFileUpload}
            disabled={isLoading}
          >
            <LucideUpload className="mr-2" />
            {isLoading ? "Uploading the file" : "Upload the file"}
          </Button>
        </div>
      </div>
    </>
  );
}

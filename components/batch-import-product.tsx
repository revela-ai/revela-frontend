"use client";

import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { LucideDownload, LucideUpload } from "lucide-react";
import { Input } from "./ui/input";
import * as XLSX from "xlsx";
import { useToast } from "./ui/use-toast";

export default function BatchImport() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const existingBulkProducts = JSON.parse(
          localStorage.getItem("bulkProducts") || "[]"
        );

        const combinedProducts = [...existingBulkProducts, ...jsonData];

        localStorage.setItem("bulkProducts", JSON.stringify(combinedProducts));

        console.log(combinedProducts);

        toast({
          title: "File uploaded successfully",
        });
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
          >
            <LucideUpload className="mr-2" />
            Upload the file
          </Button>
        </div>
      </div>
    </>
  );
}

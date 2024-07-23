"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LucideDownload } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import * as XLSX from 'xlsx';

export default function BatchImport() {
  const [file, setFile] = useState(null);
  const handleFileUpload = (e:any) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event:any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Save to local storage
        localStorage.setItem("bulkProducts", JSON.stringify(jsonData));
        console.log(jsonData);
        // Optionally: Show feedback or refresh the product list
        // alert("Products have been saved locally.");
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
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
            id="picture"
            type="file"
            accept=".xlsx, .xls"
            className="cursor-pointer"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </>
  );
}

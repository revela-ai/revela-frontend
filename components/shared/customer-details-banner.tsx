import { LucideBuilding2, LucidePackage, LucideScanFace } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CustomerDetailsBanner() {
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
        <div className="border-2 border-black p-4 rounded-full"><LucideScanFace className="text-black"/></div>
        <div>
          <p className="font-bold">Number of scans</p>
          <p className="text-sm">3 free scans</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
      <div className="border-2 border-black p-4 rounded-full">
          <LucidePackage className="text-black" />
        </div>
        <div>
          <p className="font-bold">Product of the month</p>
          <p className="text-sm">Relax Serum</p>
        </div>
      </div>
    </div>
  );
}

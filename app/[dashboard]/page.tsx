"use client"

import Scan from "@/components/scan";
import CustomerDetailsBanner from "@/components/shared/customer-details-banner";

export default function Home() {
  return (
    <div className="w-[57vw] my-2 flex flex-col gap-8">
      <CustomerDetailsBanner />
      <Scan />
    </div>
  );
}

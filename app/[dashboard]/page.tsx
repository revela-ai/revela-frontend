"use client"

import Scan from "@/components/scan";
import CustomerDetailsBanner from "@/components/shared/customer-details-banner";

export default function Home() {
  return (
    <div className="my-2 px-4 flex flex-col gap-8">
      <CustomerDetailsBanner />
      <Scan />
    </div>
  );
}

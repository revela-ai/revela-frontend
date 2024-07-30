"use client"

import Scan from "@/components/scan";
import CustomerDetailsBanner from "@/components/shared/customer-details-banner";

export default function Home() {
  return (
    <div className="my-2 px-4 flex flex-col gap-8">
      <CustomerDetailsBanner />
      <Scan className="lg:h-10 lg:w-10" buttonTitle="Start Scanning" buttonClass="lg:p-8 text-sm lg:text-2xl lg:rounded-2xl w-full"/>
    </div>
  );
}

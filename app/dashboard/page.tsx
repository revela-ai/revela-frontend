"use client"

import Scan from "@/components/scan";
import CustomerDetailsBanner from "@/components/shared/customer-details-banner";
import SkinConditionsChart from "@/components/skin-conditions-chart";
import SkinTypeChart from "@/components/skin-type-chart";

export default function Home() {
  return (
    <div className="my-2 px-4 flex flex-col gap-8">
      <CustomerDetailsBanner />
      <Scan className="lg:h-10 lg:w-10" buttonTitle="Start Scanning" buttonClass="lg:p-8 text-sm lg:text-2xl lg:rounded-2xl w-full"/>
      <div className="grid grid-cols-3 gap-4">
       <SkinTypeChart/>
       <SkinConditionsChart/>
      </div>
    </div>
  );
}

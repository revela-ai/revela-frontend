"use client"; 

import React from "react";
import Image from "next/image";
import { BusinessProvider } from "@/context/business-context";
import UniqueLinkScan from "./unique-link-scan";

export default function BusinessClientComponent({ uniqueLink, business }: { uniqueLink: string, business: any }) {
  return (
    <BusinessProvider uniqueLink={uniqueLink}>
      <div className="mt-[3.25rem] p-4 max-w-sm mx-auto text-center min-h-[calc(100vh-3.2rem)] flex flex-col justify-center items-center space-y-12">
        <h1 className="text-3xl">
          Welcome to <br />
          {business.name}&apos;s Business <br />
          on Revela
        </h1>
        <UniqueLinkScan buttonTitle="Scan Face" buttonClass="h-12 rounded-lg" />
        <div className="w-[18rem] h-[18rem] overflow-hidden rounded-xl shadow-xl">
          <Image
            src="/images/hero-img.webp"
            alt="black woman with acne"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </BusinessProvider>
  );
}

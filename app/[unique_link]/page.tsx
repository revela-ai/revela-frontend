import React from "react";
import BusinessClientComponent from "./components/business-client";

async function getBusinessData(unique_link: string) {
  const res = await fetch(
    `https://quantum-backend-sxxx.onrender.com/accounts/${unique_link}/`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch business data");
  }
  return res.json();
}

export default async function BusinessPage({
  params,
}: {
  params: { unique_link: string };
}) {
  const business = await getBusinessData(params.unique_link);

  return (
    <BusinessClientComponent
      uniqueLink={params.unique_link}
      business={business}
    />
  );
}

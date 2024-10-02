import React from "react";
import { notFound } from 'next/navigation';
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
  params: { name: string; unique_link: string };
}) {
  const business = await getBusinessData(params.unique_link);

  // Create a URL-friendly version of the business name
  const urlFriendlyBusinessName = business.name.toLowerCase().replace(/\s+/g, '-');

  // Check if the URL-friendly business name matches the one in the URL
  if (urlFriendlyBusinessName !== params.name) {
    // If it doesn't match, you can either redirect to the correct URL or show a 404 page
    // For this example, we'll show a 404 page
    notFound();
  }

  return (
    <BusinessClientComponent
      uniqueLink={params.unique_link}
      business={business}
    />
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector, Cell } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCookie } from "@/utils/utils";
import { Skeleton } from "./ui/skeleton";

interface SkinType {
  count: number;
  skin_type_value: string;
}

const chartConfig = {
  Normal: { label: "Normal", color: "hsl(var(--chart-1))" },
  Dry: { label: "Dry", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export default function SkinTypeChart() {
  const [skinTypeData, setSkinTypeData] = useState<SkinType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://quantum-backend-sxxx.onrender.com/dashboard";

  useEffect(() => {
    const accessToken = getCookie("access_token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/skin-types/", { headers });
        if (!response.ok) throw new Error("Network response was not ok.");
        const data: SkinType[] = await response.json();
        setSkinTypeData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const colorMap: { [key: string]: string } = {
    Normal: "hsl(var(--chart-1))",
    Dry: "hsl(var(--chart-2))",
    // Add more skin types and colors as needed
  };

  return (
    <>
      {isLoading ? (
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Skin Type Distribution</CardTitle>
            <CardDescription>Based on latest scans</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-8">
              <Skeleton className="h-60 w-60 rounded-full" />
          </CardContent>
        </Card>
      ) : error ? (
        <Card>Error: {error}</Card>
      ) : (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Skin Type Distribution</CardTitle>
            <CardDescription>Based on latest scans</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={skinTypeData}
                  dataKey="count"
                  nameKey="skin_type_value"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={0}
                  activeShape={({
                    outerRadius = 0,
                    ...props
                  }: PieSectorDataItem) => (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  )}
                >
                  {skinTypeData.map((entry) => (
                    <Cell
                      key={entry.skin_type_value}
                      fill={colorMap[entry.skin_type_value]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Updated data <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing data based on latest scans
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

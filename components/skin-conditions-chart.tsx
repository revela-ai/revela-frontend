"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
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

interface SkinCondition {
  count: number;
  skin_acne_level: string;
  skin_acne_score: number;
}

const chartConfig = {
  skin_acne_score: {
    label: "Acne Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function SkinConditionsChart() {
  const [skinConditionData, setSkinConditionData] = useState<SkinCondition[]>(
    []
  );
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
        const response = await fetch(API_URL + "/skin-conditions/", {
          headers,
        });
        if (!response.ok) throw new Error("Network response was not ok.");
        const data: SkinCondition[] = await response.json();
        setSkinConditionData(data);
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

  return (
    <>
      {isLoading ? (
        <Card>
          <CardHeader className="items-center pb-0">
            <CardTitle>Skin Condition Distribution</CardTitle>
            <CardDescription>Based on latest scans</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center p-8 justify-center gap-12">
            <Skeleton className="lg:h-64 lg:w-44 rounded-lg" />
            <Skeleton className="lg:h-64 lg:w-44 rounded-lg" />
          </CardContent>
        </Card>
      ) : error ? (
        <Card>Error: {error}</Card>
      ) : (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Skin Condition Distribution</CardTitle>
            <CardDescription>Based on latest scans</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-w-16 aspect-h-9"
            >
              <BarChart
                data={skinConditionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="skin_acne_level"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Bar
                  dataKey="skin_acne_score"
                  fill={chartConfig.skin_acne_score.color}
                  radius={8}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-center gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
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

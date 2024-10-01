"use client";

import { LucideSquareX, ScanFace } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { AnalysisProvider } from "@/context/analysis-context";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UniqueCameraScan from "./unique-camera-scan";

interface ScanProps {
  className?: string;
  buttonTitle?: string;
  buttonClass?: string;
}

const UniqueLinkScan: React.FC<ScanProps> = ({
  className,
  buttonTitle,
  buttonClass,
}) => {
  return (
    <AnalysisProvider>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex ms-auto justify-center items-center w-full lg:w-fit">
            <Button className={`${clsx(buttonClass)}`}>
              <ScanFace className={`${clsx(className)} mr-2`} />
              {buttonTitle}
            </Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-none w-[87vw]">
          <AlertDialogHeader>
            <div className="flex items-center">
              <AlertDialogTitle>Scan Face</AlertDialogTitle>
              <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                <LucideSquareX />
              </AlertDialogCancel>
            </div>
            <AlertDialogDescription className="text-start">
              Select the camera icon to{" "}
              <span className="font-semibold">take a picture</span> or{" "}
              <span className="font-semibold">upload from your device</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <UniqueCameraScan />
        </AlertDialogContent>
      </AlertDialog>
    </AnalysisProvider>
  );
};

export default UniqueLinkScan;

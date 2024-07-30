import { LucideSquareX, ScanFace } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import CameraScan from "./camera-scan";
import clsx from "clsx";

interface ScanProps {
  className?: string;
  buttonTitle?: string;
  buttonClass?: string;
}

const Scan: React.FC<ScanProps> = ({ className, buttonTitle, buttonClass }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex ms-auto justify-center items-center w-full lg:w-fit">
          <Button className={`${clsx(buttonClass)}`}>
            <ScanFace className={`${clsx(className)} mr-2`} />
            {buttonTitle}
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
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
        <CameraScan />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Scan;

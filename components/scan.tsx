import { LucideSquareX, ScanFace } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import CameraScan from "./camera-scan";

export default function Scan() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-[54.26vw] mx-auto justify-center items-center">
          <Button className="rounded-full text-2xl p-8">
            <ScanFace className="w-10 h-10 mr-2" />
            Start Scanning
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
            <LucideSquareX/>
        </AlertDialogCancel>
        <CameraScan/>
      </AlertDialogContent>
    </AlertDialog>
  );
}

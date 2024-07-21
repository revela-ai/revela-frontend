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

export default function Scan() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex ms-auto justify-center items-center">
          <Button className="rounded-2xl text-2xl p-8">
            <ScanFace className="w-10 h-10 mr-2" />
            Start Scanning
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
          <AlertDialogDescription>
            Select the camera icon to <span className="font-semibold">take a picture</span> or <span className="font-semibold">upload from your device</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CameraScan />
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";
import React, { useState } from "react";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/firebase.Config";
import useCamera from "@/hooks/useCamera";
import CustomWebcam from "./custom-webcam";
import Notice from "./notice";
import AnalysisView from "./analysis-view";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  CameraIcon,
  ImagePlusIcon,
  LucideSquareX,
  MailIcon,
  PlusIcon,
  Redo2Icon,
  Share2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import CustomerDetailsForm from "./customer-details-form";
import { usePathname } from "next/navigation";

const API_URL = "https://quantum-backend-sxxx.onrender.com/skintone_analysis/";

const CameraScan: React.FC = () => {
  const {
    isCameraOpen,
    capturedImage,
    fileInputRef,
    handleOpenCamera,
    handleCapture,
    handleUpload,
  } = useCamera();
  const [processing, setProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>({});
  const [process, setProcess] = useState("capture");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const pathname = usePathname();

  const sendImageAnalysis = async () => {
    setProcessing(true);

    const base64Response = await fetch(capturedImage || "");
    const blob = await base64Response.blob();

    const date = new Date();
    const currentDay = date.toISOString().split("T")[0];

    const filename = v4();
    const imagesRef = ref(storage, `${currentDay}/${filename}`);
    const snapshot = await uploadBytes(imagesRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const formData = new FormData();
    formData.append("image", blob);
    formData.append("image_url", downloadURL);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(response);
      setAnalysis(data);
      setProcess("analysis");
    } catch (error) {
      toast({
        title: "An error occurred. Retry in a second!",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const sendAnalysisByEmail = async () => {
    const data = { analysis, email };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://quantum-backend-sxxx.onrender.com/send_analysis/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast({ title: "Analysis sent to your email!" });
        setIsLoading(false);
      } else {
        toast({
          title:
            "Failed to send analysis. Please check the email again and retry!",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error sending analysis to email",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div>
        {process === "capture" && (
          <>
            {isCameraOpen ? (
              <>
                <CustomWebcam onCapture={handleCapture} />
                <Notice />
              </>
            ) : capturedImage ? (
              <div>
                <div className="p-2 bg-gradient-to-t from-red-200 via-pink-300 to-red-400 w-[300px] h-[300px] mx-auto rounded-full">
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${capturedImage})` }}
                  >
                    {processing && (
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 animate-bounce-slow"></div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center gap-5 my-2">
                  <Button
                    onClick={handleOpenCamera}
                    disabled={processing}
                    className="rounded-full"
                  >
                    Retake
                  </Button>
                  <Button
                    onClick={sendImageAnalysis}
                    disabled={processing}
                    className="rounded-full"
                  >
                    {processing ? "Processing..." : "Analyze"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-5">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="rounded-full p-1 bg-gradient-to-t from-red-200 via-pink-300 to-red-400">
                      <Button className="rounded-full w-16 h-16 bg-white hover:bg-transparent border-none hover:bg-gradient-to-t ease-in-out from-red-200 via-pink-300 to-red-400 group">
                        <CameraIcon className="h-10 w-10 text-pink-400/70 group-hover:text-white transition-colors duration-300" />
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <div className="flex items-center">
                        <AlertDialogTitle>Scanning Face</AlertDialogTitle>
                        <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                          <LucideSquareX/>
                        </AlertDialogCancel>
                      </div>
                    </AlertDialogHeader>
                    <CustomWebcam onCapture={handleCapture} />
                    <AlertDialogDescription>
                      <Notice />
                    </AlertDialogDescription>
                  </AlertDialogContent>
                </AlertDialog>
                <div className="rounded-full p-1 bg-gradient-to-t from-pink-200 via-red-300 to-red-400">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full w-16 h-16 bg-transparent bg-white hover:bg-transparent border-none hover:bg-gradient-to-t ease-in-out from-pink-200 via-red-300 to-red-400 group"
                  >
                    <ImagePlusIcon className="h-10 w-10 text-red-400/70 group-hover:text-white transition-colors duration-300" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {process === "analysis" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-full">View Analysis</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center">
                  <AlertDialogTitle>Analysis Result</AlertDialogTitle>
                  <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                    <LucideSquareX />
                  </AlertDialogCancel>
                </div>
                <AlertDialogDescription>
                  <AnalysisView analysis={analysis} />
                  <div className="flex items-center gap-2">
                    <Input
                      type="email"
                      placeholder="Enter customer email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                    />
                    <Button
                      onClick={sendAnalysisByEmail}
                      disabled={isLoading}
                      className="bg-transparent border border-primary text-primary hover:text-white"
                    >
                      <MailIcon className="w-5 h-5 mr-2" />
                      {isLoading ? "Sending mail..." : "Send to Email"}
                    </Button>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button
                      onClick={() => setProcess("capture")}
                      className="rounded-full"
                    >
                      <Redo2Icon className="w-5 h-5 mr-2" />
                      Retake Analysis
                    </Button>
                    {pathname === "/dashboard" && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="rounded-full flex">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Assign to customer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <div className="flex items-center">
                              <AlertDialogTitle>
                                Customer Details
                              </AlertDialogTitle>
                              <AlertDialogCancel className="border-none ms-auto hover:bg-transparent w-fit">
                                <LucideSquareX />
                              </AlertDialogCancel>
                            </div>
                            <AlertDialogDescription>
                              Please take a moment to input your details
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <CustomerDetailsForm />
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </>
  );
};

export default CameraScan;

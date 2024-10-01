"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

interface CustomWebcamProps {
  onCapture: (imageSrc: string) => void;
}

const CustomWebcam: React.FC<CustomWebcamProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() || "";
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <div className="container">
      <div className="w-56 h-56 lg:w-[300px] lg:h-[300px] mx-auto rounded-full p-2 bg-gradient-to-t from-blue-200 via-pink-300 to-pink-400">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="webcam"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            className="rounded-full w-full h-full object-cover"
            mirrored={true}
            videoConstraints={{
              facingMode: "user",
            }}
          />
        )}
      </div>
      <div className="w-fit mx-auto my-2">
        {imgSrc ? (
          <Button onClick={() => setImgSrc(null)}>Retake photo</Button>
        ) : (
          <Button onClick={capture} className="rounded-lg">
            Capture Face
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;

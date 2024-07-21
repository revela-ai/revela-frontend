import { useState, useRef } from 'react';

const useCamera = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
  };

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setIsCameraOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return { isCameraOpen, capturedImage, fileInputRef, handleOpenCamera, handleCapture, handleUpload };
};

export default useCamera;

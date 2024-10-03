import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

interface ProfileCardProps {
  uniqueLink: string;
}

export default function ProfileCard({ uniqueLink }: ProfileCardProps) {
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueLink);
    toast({
      title: "Unique Link Copied",
    });
  };

  return (
    <div className="mt-auto p-4">
      <div className="border rounded-md shadow-lg p-4">
        <div className="mx-auto text-muted-foreground">
          <div className="flex justify-between items-center">
            <p className="text-primary font-semibold">Your Unique Link</p>
            <Copy onClick={copyToClipboard} size={18} className="cursor-pointer"/>
          </div>
          <p className={`${dmSans.className} text-blue-900/80 text-sm mt-2`}>
            {uniqueLink}
          </p>
        </div>
      </div>
    </div>
  );
}

import { Dot } from "lucide-react";
import React from "react";

const noticeLists = [
  "Ensure your face is fully visible and centered in the frame.",
  "Make sure you have good lighting, preferably natural light.",
  "Remove any glasses or accessories covering your face.",
  "Keep your expression neutral and avoid heavy makeup.",
  "Keep the background simple and uncluttered.",
];

export default function Notice() {
  return (
    <div>
      <h1 className="text-muted-foreground font-bold">
        Photo Guidelines for Accurate Analysis
      </h1>

      {noticeLists.map((noticeList, index) => (
        <div key={index} className="flex items-center">
          <Dot />
          <p key={index} className="text-sm font-light text-muted-foreground">
            {noticeList}
          </p>
        </div>
      ))}
    </div>
  );
}

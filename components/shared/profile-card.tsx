import React from "react";

export default function ProfileCard() {
  return (
    <div className="mt-auto p-4">
      <div className="border rounded-md shadow-lg p-4">
        <div className="mx-auto text-muted-foreground">
          <p className="text-primary font-semibold">Your Unique Link</p>
          {/* display unique link here for business to copy */}
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function ProfileCard() {
  return (
    <div className="mt-auto p-4">
      <div className="border rounded-md shadow-lg p-4">
        <div className="mx-auto text-muted-foreground">
          <p className="text-primary font-semibold">Upgrade Plan</p>
          <p className="text-muted-foreground text-xs">Subscribe to Pro to use extra features</p>
        </div>
      </div>
    </div>
  );
}

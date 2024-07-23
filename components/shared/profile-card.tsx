import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LucideCircleUser, LucideSettings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const getCookie = (name: string) => {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export default function ProfileCard() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const csrfToken = getCookie("csrftoken");
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");

      console.log(csrfToken);
      console.log(accessToken);
      console.log(refreshToken);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (csrfToken) {
        headers["X-CSRFToken"] = csrfToken;
      }

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        "https://quantum-backend-sxxx.onrender.com/accounts/logout/",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ refresh: refreshToken }),
          credentials: "include",
        }
      );

      if (response.ok) {
        document.cookie =
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie =
          "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        toast({
          title: "Successfully logged out",
          description: "You will be redirected shortly.",
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        toast({
          title: "Logout failed",
          description: "Unable to log out. Please try again.",
          variant: "destructive",
        });
        console.error("Logout failed");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <div className="mt-auto p-4">
      <div className="border rounded-md shadow-lg p-4 flex items-center">
        <LucideCircleUser />
        <div className="mx-auto text-muted-foreground text-xs">
          <p className="text-primary font-semibold">Precious A.</p>
          <p>Upgrade Plan</p>
        </div>
        <div className="ms-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <LucideSettings />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border bg-slate-50 rounded-md p-2"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

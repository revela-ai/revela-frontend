import { useEffect, useState } from "react";

interface Business {
  email: string;
  name: string;
  website: string | null;
  registration: string | null;
  referal_link: string | null;
  is_active: boolean;
  is_verified: boolean;
}

export const getCookie = (name: string): string => {
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

export async function fetchBusinessDetails(email: string): Promise<Business> {
  try {
    const accessToken = getCookie("access_token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const url = `https://quantum-backend-sxxx.onrender.com/accounts/business/${email}/`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(`Failed to fetch business details: ${response.statusText}`);
      throw new Error("Failed to fetch business details");
    }

    const data: Business = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching business details: ${error}`);
    throw error;
  }
}

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("local-storage", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
};

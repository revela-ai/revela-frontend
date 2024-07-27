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

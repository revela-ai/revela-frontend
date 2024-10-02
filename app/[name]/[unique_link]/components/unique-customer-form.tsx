import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";
import countries from "world-countries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAnalysis } from "@/context/analysis-context";
import { useBusiness } from "@/context/business-context";

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

const countryOptions = countries.map((country) => ({
  value: country.name.common,
  label: country.name.common,
}));

type CountryOption = {
  value: string;
  label: string;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  telephone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  }),
  date_of_birth: z.string().min(1, {
    message: "Date of Birth is required.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  country_of_origin: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
});

export default function UniqueCustomerDetailsForm() {
  const { analysis } = useAnalysis();
  const { uniqueLink } = useBusiness();
  const analysis_id = analysis?.analysis_id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telephone: "",
      date_of_birth: "",
      address: "",
      country_of_origin: null,
    },
  });

  const accessToken = getCookie("access_token");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const API_ENDPOINT = "https://quantum-backend-sxxx.onrender.com/customer/create/";
    if (!analysis_id) {
      console.error("No analysis ID available");
      return;
    }

    const dataToSend = {
      analysis_id,
      unique_link: uniqueLink,
      ...values,
      country_of_origin: values.country_of_origin
        ? values.country_of_origin.value
        : null,
    };

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${accessToken})}`,
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error(dataToSend);
      console.error(accessToken);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ami Hayford" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="05493030300" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="1-11-1111" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Accra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country_of_origin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country of Origin</FormLabel>
                <FormControl>
                  <Select
                    options={countryOptions}
                    {...field}
                    placeholder="Select country"
                    classNamePrefix="react-select"
                    className="text-sm text-muted-foreground"
                    onChange={(value) =>
                      form.setValue(
                        "country_of_origin",
                        value as CountryOption | null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full w-full lg:w-[323px] mx-auto"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

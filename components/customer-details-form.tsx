"use client"

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
}));

type CountryOption = {
  value: string;
  label: string;
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits.",
  }),
  dob: z.string().min(1, {
    message: "Date of Birth is required.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
});

export default function CustomerDetailsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      country: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="p-8 lg:w-[45vw] bg-muted/40 shadow-lg rounded-lg">
      <h2 className="lg:text-3xl">Customer Details</h2>
      <p className="text-muted-foreground">
        Please take a moment to input your details
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:mt-8"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="username"
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
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="phone"
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
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="1/11/1111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
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
              name="country"
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
                        form.setValue("country", value as CountryOption | null)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
            <Button type="submit" className="rounded-full lg:w-[323px] mx-auto">
              View Results
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

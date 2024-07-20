"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import RevelaLogo from "@/components/shared/logo";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    businessName: z.string().min(1, { message: "Business name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signup = async (data: FormData) => {
    const API_ENDPOINT =
      "https://quantum-backend-sxxx.onrender.com/accounts/signup/";

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.businessName,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Account successfuly created",
          description: "Please check your email to verify your account",
        });
        
        router.push(
          `/auth/email-verification?email=${encodeURIComponent(
            data.email
          )}&name=${encodeURIComponent(
            data.businessName
          )}&password=${encodeURIComponent(data.password)}`
        );
      } else {
        const errorData = await response.json();
        toast({
          title: `Signup failed`,
          description: errorData.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred during signup",
        description: "Unable to signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="lg:hidden flex flex-col justify-center items-center mt-[5vh] lg:mt-0">
        <RevelaLogo />
        <p className="mt-2 lg:mt-4 text-muted-foreground">
          Sign in or create an account
        </p>
      </div>
      <div className="flex items-center justify-center py-5 lg:py-12">
        <div className="w-[87vw] py-8 px-4 lg:w-[45vw] xl:w-[543px] mx-auto lg:px-8 xl:px-[44px] bg-[#F6F7F8] shadow-lg grid">
          <div className="grid gap-2">
            <h1 className="text-xl lg:text-3xl font-bold">Create an account</h1>
            <Button variant="outline" className="w-full mt-4">
              <Image
                src="/images/google-logo.svg"
                alt="google logo"
                className="mr-2"
                width={24}
                height={24}
              />
              Continue with Google
            </Button>
          </div>
          <div className="flex gap-5 items-center my-4">
            <Image
              src="/images/hr-line.svg"
              className="lg:w-[186px] w-[120px] mx-auto"
              alt="horizontal line"
              width={175}
              height={0}
            />
            <p className="text-balance text-muted-foreground">Or</p>
            <Image
              src="/images/hr-line.svg"
              className="lg:w-[186px] w-[120px] mx-auto"
              alt="horizontal line"
              width={175}
              height={0}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(signup)} className="grid gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs">
                By clicking Create account, I agree that I have read and
                accepted the 
                <span className="text-primary">
                  <Link href="">Terms of Use</Link>
                </span>
                 and 
                <span className="text-primary">
                  <Link href="">Privacy Policy.</Link>
                </span>
              </p>
              <div className="lg:flex items-center">
                <p className="text-xs lg:text-sm text-muted-foreground text-center lg:text-start">
                  Already have an account?{" "}
                  <span>
                    <Link
                      href="/auth/login"
                      className="text-primary font-semibold"
                    >
                      Sign in here
                    </Link>
                  </span>
                </p>
                <Button
                  type="submit"
                  className="w-full lg:w-fit mt-4 lg:mt-0 rounded-full ms-auto"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex flex-col items-center justify-center">
        <div className="flex gap-4">
          <Image
            src="/images/logo.svg"
            alt="Image"
            width={53}
            height={53}
            className=""
          />
          <p className="lg:text-[35px]">Revela</p>
        </div>
        <p className="mt-2">Sign in or create an account</p>
      </div>
    </div>
  );
}

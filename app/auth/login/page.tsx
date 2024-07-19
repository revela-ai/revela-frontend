"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RevelaLogo from "@/components/shared/logo";

const API_ENDPOINT = "https://quantum-backend-sxxx.onrender.com/accounts/signin/";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { access, refresh } = responseData;

        document.cookie = `access_token=${access}; path=/;`;
        document.cookie = `refresh_token=${refresh}; path=/;`;

        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData);
      }
    } catch (error) {
      toast.error("An error occurred during login, verify your internet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <Toaster richColors />
      <div className="lg:hidden flex flex-col justify-center items-center mt-[5vh] lg:mt-0">
        <RevelaLogo />
        <p className="mt-4 text-muted-foreground">
          Sign in or create an account
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="w-[87vw] py-8 px-4 lg:w-[45vw] xl:w-[543px] lg:px-8 xl:px-[44px] lg:py-[65px] bg-[#F6F7F8] shadow-lg grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-xl lg:text-3xl font-bold">Login</h1>
            <p className="text-xs lg:text-sm text-balance text-muted-foreground">
              New user?{" "}
              <span>
                <Link
                  href="/auth/signup"
                  className="text-primary font-semibold"
                >
                  Create an account
                </Link>
              </span>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/auth/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full lg:w-[105px] rounded-full ms-auto"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Continue"}
              </Button>
              <div className="flex">
                <Image
                  src="/images/hr-line.svg"
                  alt="horizontal line"
                  className=" lg:w-[186px] w-[120px] mx-auto"
                  width={175}
                  height={0}
                />
                <p className="text-balance text-muted-foreground">Or</p>
                <Image
                  src="/images/hr-line.svg"
                  alt="horizontal line"
                  className="lg:w-[186px] w-[120px] mx-auto"
                  width={175}
                  height={0}
                />
              </div>
              <Button variant="outline" className="w-full" type="button">
                <Image
                  src="/images/google-logo.svg"
                  alt="google logo"
                  className="mr-2"
                  width={24}
                  height={24}
                />
                Continue with Google
              </Button>
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

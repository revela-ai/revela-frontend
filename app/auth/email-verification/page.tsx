"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import RevelaLogo from "@/components/shared/logo";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  otp: z.string().min(1, { message: "OTP is required" }),
});

type FormData = z.infer<typeof formSchema>;

export default function EmailVerification() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyAndAccess = async (data: FormData) => {
    setLoading(true);
    const API_ENDPOINT =
      "https://quantum-backend-sxxx.onrender.com/accounts/verify/";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: data.otp,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { access, refresh } = responseData;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        toast({ title: "Your Email has been verified" });
        document.cookie = `access_token=${access}; path=/;`;
        document.cookie = `refresh_token=${refresh}; path=/;`;

        setTimeout(() => {
          router.push(`/dashboard`);
        }, 2000);
      } else {
        const errorData = await response.json();
        toast({
          title: `Verification failed: ${errorData.message}`,
          description: errorData.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred during verification",
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
          Verify your email to use Revela
        </p>
      </div>
      <div className="flex items-center justify-center py-5 lg:py-12">
        <div className="w-[87vw] py-8 px-4 lg:w-[45vw] xl:w-[543px] mx-auto lg:px-8 xl:px-[44px] bg-[#F6F7F8] shadow-lg grid">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(verifyAndAccess)}
              className="grid gap-4"
            >
              <div className="grid gap-2">
                <h1 className="text-xl lg:text-3xl font-bold">
                  Verify your email
                </h1>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve sent an email to {email}, please enter the code
                  below.
                </p>
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 rounded-full"
              >
                {loading ? "Verifying..." : "Verify and Create Account"}
              </Button>
              <p className="text-xs lg:text-sm text-muted-foreground text-center lg:text-start">
                Didn&apos;t see your email?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary font-semibold"
                >
                  Resend
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex flex-col items-center justify-center">
        <div className="flex gap-4">
          <Image
            src="/images/logo.svg"
            alt="Revela Logo"
            width={53}
            height={53}
          />
          <p className="lg:text-[35px]">Revela</p>
        </div>
        <p className="mt-2">Email Verification</p>
      </div>
    </div>
  );
}

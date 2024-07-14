"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="lg:hidden flex flex-col justify-center items-center mt-[5vh] lg:mt-0">
        <div className="flex gap-1 lg:gap-4">
          <Image
            src="/images/logo.svg"
            alt="Image"
            width={53}
            height={53}
            className=""
          />
          <p className="lg:text-[35px] text-2xl self-center">Revela</p>
        </div>
        <p className="mt-2 lg:mt-4 text-muted-foreground">
          Sign in or create an account
        </p>
      </div>
      <div className="flex items-center justify-center py-5 lg:py-12">
        <div className=" w-[87vw] py-8 px-4 lg:w-[45vw] xl:w-[543px] lg:h-[600px] mx-auto lg:px-8 xl:px-[44px] bg-[#F6F7F8] shadow-lg grid">
          {step === 1 && (
            <>
              <div className="grid gap-2">
                <p className="text-balance text-muted-foreground text-sm lg:text-base">
                  Step 1 of 2
                </p>
                <h1 className="text-xl lg:text-3xl font-bold">
                  Create an account
                </h1>
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
              <div className="flex gap-5 items-center">
                <Image
                  src="/images/hr-line.svg"
                  className="lg:w-[175px] w-[120px] mx-auto"
                  alt="horizontal line"
                  width={175}
                  height={0}
                />
                <p className="text-balance text-muted-foreground">or</p>
                <Image
                  src="/images/hr-line.svg"
                  className="lg:w-[175px] w-[120px] mx-auto"
                  alt="horizontal line"
                  width={175}
                  height={0}
                />
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="*******"
                  />
                </div>
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
                    onClick={handleNextStep}
                    className="lg:w-[105px] w-full mt-4 lg:mt-0 rounded-full ms-auto"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid gap-2">
                <p className="text-balance text-muted-foreground text-sm lg:text-base">
                  Step 2 of 2
                </p>
                <h1 className="text-xl lg:text-3xl font-bold">
                  Welcome to Revela
                </h1>
                <p className="text-muted-foreground">Please take a moment to complete your account</p>
              </div>
              <div className="grid gap-6">
                <div className="flex gap-2">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="firstName">Business Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="lastName">Business Email</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="grid gap-2  w-full">
                    <Label htmlFor="phone">Business Certificate</Label>
                    <Input id="picture" type="file" className="text-muted-foreground"/>
                  </div>
                  <div className="grid gap-2  w-full">
                    <Label htmlFor="phone">Confirm Password</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="*******"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Upload Logo</Label>
                  <Input id="picture" type="file" className="text-muted-foreground"/>
                </div>
                <p className="text-xs">
                  Revela may keep me informed with personalized emails about
                  products and services. See our 
                  <span className="text-primary">
                    <Link href="">Privacy Policy</Link>
                  </span>
                   for more details or to opt-out at any time.
                </p>
                <div className="lg:flex items-center">
                  <Button
                    onClick={handlePrevStep}
                    className="lg:w-[105px] w-full mt-4 lg:mt-0 rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="lg:w-[105px] w-full mt-4 lg:mt-0 rounded-full ms-auto"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          )}
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

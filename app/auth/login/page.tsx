"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
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
        <p className="mt-4 text-muted-foreground">Sign in or create an account</p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="w-[87vw] py-8 px-4 lg:w-[45vw] xl:w-[543px] lg:px-8 xl:px-[44px] lg:py-[65px] bg-[#F6F7F8] shadow-lg grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-xl lg:text-3xl font-bold">Login</h1>
            <p className="text-xs lg:text-sm text-balance text-muted-foreground">
              New user? <span><Link href="/auth/signup" className="text-primary font-semibold">
              Create an account
            </Link></span>
            </p>
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
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required placeholder="*******"/>
            </div>
            <Button type="submit" className="w-full lg:w-[105px] rounded-full ms-auto">
              Continue
            </Button>
           <div className="flex gap-5">
           <Image src="/images/hr-line.svg" alt="horizontal line" className=" max-w-[120px] mx-auto" width={175} height={0}/>
           <p className="text-balance text-muted-foreground">or</p>
           <Image src="/images/hr-line.svg" alt="horizontal line" className="max-w-[120px] mx-auto" width={175} height={0}/>
           </div>
            <Button variant="outline" className="w-full">
            <Image src="/images/google-logo.svg" alt="google logo" className="mr-2" width={24} height={24}/>
              Continue with Google
            </Button>
          </div>
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
  )
}

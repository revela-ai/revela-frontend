import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Playfair_Display } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const playfair_display = Playfair_Display({
  subsets: ["latin-ext"],
  style: "italic",
});
export default function Home() {
  return (
    // <div className="mt-20 flex flex-col lg:flex lg:flex-row max-w-[1040px] items-center xl:max-w-[86.25rem] mx-auto px-4 xl:px-0">
    //   <div className="lg:w-1/2 text-center lg:text-start">
    //     <h1 className="text-3xl lg:text-5xl xl:text-7xl mb-4 font-bold text-primary">
    //       Reveal the secret to your client&apos;s best skin
    //     </h1>
    //     <p className="xl:w-4/5">
    //       Revela&apos;s accurate skin analysis & AI-Powered product
    //       recommendations bridges the gap between science and beauty
    //     </p>
    //     <Button asChild className="rounded-full w-full lg:w-fit h-11 px-20 my-4">
    //       <Link href="/auth/signup">Register as a business</Link>
    //     </Button>
    //   </div>
    //   <div className="overflow-hidden xl:h-[44rem] xl:w-[32rem] md:h-[32rem] md:w-96 ms-auto  shadow-2xl rounded-2xl">
    //     <Image
    //       src="/images/hero-img.webp"
    //       className="w-auto h-auto object-contain"
    //       alt="black woman with hyperpigmented skin"
    //       width={2000}
    //       height={2000}
    //     />
    //   </div>
    // </div>
    <div className="flex flex-col-reverse lg:flex lg:flex-row min-h-[85vh] items-center xl:max-w-full mx-auto relative">
      <div className="lg:w-1/2 text-center space-y-6 px-4 lg:px-0 mb-4 lg:mb-0">
        <Image
          src="/images/logo-alt.svg"
          alt="logo"
          width={500}
          height={500}
          className="absolute top-5 left-24 w-44 hidden lg:block"
        />
        <h1
          className={`${playfair_display.className} text-3xl lg:text-5xl xl:text-7xl font-bold`}
        >
          Revolutionize Your Skincare Routine
        </h1>
        <p className="xl:w-3/5 mx-auto text-sm lg:text-[1.125rem]">
          Tired of guesswork when it comes to your skincare? Join Revela&apos;s
          waitlist and experience AI-Powered skincare recommendations built just
          for YOU.
        </p>
        <form action="https://formspree.io/f/xdkoyrnp" method="POST">
          <div className="relative lg:w-3/5 mx-auto">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2"
              size={20}
            />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 py-6"
              required
            />
          </div>
          <p className="text-xs mt-4">
            By providing your information, you agree to Revela&apos;s{" "}
            <span className="font-bold">terms of service</span> &{" "}
            <span className="font-bold">privacy</span>.{" "}
          </p>
          <Button className="rounded-full w-full lg:w-fit h-11 px-8 my-4">
            Join Waitlist
          </Button>
        </form>
      </div>
      <div className="absolute top-0 left-1/3 z-[9999] hidden md:block">
        <Image
          src="/images/paint.svg"
          alt="waitlist-hero"
          width={500}
          height={500}
        />
      </div>
      <div className="lg:w-1/2 lg:bg-[#444b2819] lg:h-screen items-center justify-center lg:flex relative">
        <Image
          src="/images/laptop.png"
          className="lg:absolute left-48"
          alt="black woman with hyperpigmented skin"
          width={1008}
          height={591}
        />
      </div>
    </div>
  );
}

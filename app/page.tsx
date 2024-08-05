import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col lg:flex lg:flex-row max-w-[1040px] items-center xl:max-w-[86.25rem] mx-auto px-4 xl:px-0">
      <div className="lg:w-1/2 text-center lg:text-start">
        <h1 className="text-3xl lg:text-5xl xl:text-7xl mb-4 font-bold text-primary">
          Reveal the secret to your client&apos;s best skin
        </h1>
        <p className="xl:w-4/5">
          Revela&apos;s accurate skin analysis & AI-Powered product
          recommendations bridges the gap between science and beauty
        </p>
        <Button asChild className="rounded-full w-fit h-11 px-20 mt-4">
          <Link href="/auth/signup">Get Started</Link>
        </Button>
      </div>
      <div className="overflow-hidden xl:h-[44rem] xl:w-[32rem] md:h-[32rem] md:w-96 ms-auto  shadow-2xl rounded-2xl">
        <Image
          src="/images/hero-img.webp"
          className="w-auto h-auto object-contain"
          alt="black woman with hyperpigmented skin"
          width={2000}
          height={2000}
        />
      </div>
    </div>
  );
}

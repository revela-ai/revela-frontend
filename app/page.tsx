import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-20 flex max-w-[1040px] items-center xl:max-w-[86.25rem] mx-auto">
      <div className="w-1/2">
        <h1 className="xl:text-7xl mb-4 font-bold text-primary">
          Reveal the secret to your client&apos;s best skin
        </h1>
        <p className="xl:w-4/5">Revela&apos;s accurate skin analysis & AI-Powered product recommendations bridges the gap between science and beauty</p>
      </div>
      <div className="overflow-hidden h-[44rem] w-[32rem] ms-auto  shadow-2xl rounded-2xl">
        <Image src="/images/hero-img.webp" className="w-auto h-auto object-contain" alt="black woman with hyperpigmented skin" width={2000} height={2000}/>
      </div>
    </div>
  );
}

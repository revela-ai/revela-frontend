import Image from "next/image";
import React from "react";
import clsx from 'clsx'; 

export default function RevelaLogo({ imageClassName = "", textClassName = "" }) {
  return (
    <div className="flex gap-1 lg:gap-4">
      <Image
        src="/images/logo.svg"
        alt="Image"
        width={53}
        height={53}
        className={clsx("", imageClassName)}
      />
      <p className={clsx("lg:text-[35px] text-2xl self-center", textClassName)}>Revela</p>
    </div>
  );
}

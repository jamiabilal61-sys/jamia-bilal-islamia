import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">

      <Image
        src={siteConfig.logo}
        alt={siteConfig.nameEn}
        width={90}
        height={90}
        priority
      />

      <div>

        <h1 className="text-3xl font-bold text-[#0F3D6E]">
          {siteConfig.nameUr}
        </h1>

        <p className="text-gray-600">
          {siteConfig.nameEn}
        </p>

        <p className="text-green-700">
          {siteConfig.tagline}
        </p>

      </div>

    </div>
  );
}
import { siteConfig } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-blue-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col lg:flex-row justify-between items-center gap-2">

        {/* Right */}
        <div className="flex flex-wrap items-center gap-4">

          <span>
            📍 {siteConfig.address}
          </span>

          <span>
            ☎ {siteConfig.phone}
          </span>

          <a href={`mailto:${siteConfig.email}`} className="hover:text-yellow-300 transition" dir="ltr">
            ✉ {siteConfig.email}
          </a>

        </div>

        {/* Left */}

        <div className="flex flex-wrap items-center gap-5">

          <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-yellow-300">Facebook</a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="hover:text-yellow-300">Instagram</a>
          <a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="hover:text-yellow-300">X</a>

          <span className="text-yellow-300">
            صبح بخیر! (صبح بخیر و برکت)
          </span>

          <button className="hover:text-yellow-300 transition">
            سرپرست پورٹل
          </button>

          <button className="hover:text-yellow-300 transition">
            آن لائن داخلہ
          </button>

          <div className="border-r border-white/40 h-4"></div>

          <button className="hover:text-yellow-300">
            اردو
          </button>

          <button className="hover:text-yellow-300">
            English
          </button>

          <button className="hover:text-yellow-300">
            العربية
          </button>

        </div>

      </div>
    </div>
  );
}

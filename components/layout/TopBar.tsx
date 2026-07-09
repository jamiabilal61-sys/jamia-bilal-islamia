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

          <span>
            📱 {siteConfig.mobile}
          </span>

        </div>

        {/* Left */}

        <div className="flex flex-wrap items-center gap-5">

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
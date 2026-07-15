import Image from "next/image";
import { leadership } from "@/data/leadership";

export default function Leadership() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div>

            <Image
              src={leadership.image}
              alt={leadership.name}
              width={500}
              height={600}
              className="rounded-2xl shadow-xl w-full"
            />

          </div>

          {/* Content */}

          <div>

            <span className="text-blue-700 font-bold">

              پیغامِ مہتمم

            </span>

            <h2 className="text-4xl font-bold mt-4">

              {leadership.name}

            </h2>

            <p className="text-gray-500 mt-2">

              {leadership.designation}

            </p>

            <p className="mt-8 leading-9 text-gray-700 whitespace-pre-line">

              {leadership.message}

            </p>

            <p className="mt-10 font-bold text-blue-900">

              {leadership.signature}

            </p>

            <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition">

              مکمل پیغام

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
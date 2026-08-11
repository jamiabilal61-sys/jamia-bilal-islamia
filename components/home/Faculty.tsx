import Link from "next/link";
import { faculty } from "@/lib/faculty";

export default function Faculty() {
  const featuredFaculty = faculty.slice(0, 8);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="font-semibold text-green-700">اساتذۂ کرام</span>
          <h2 className="mt-3 text-4xl font-bold text-blue-900 lg:text-5xl">ہمارے قابلِ احترام اساتذہ</h2>
          <p className="mx-auto mt-5 max-w-3xl leading-8 text-gray-600">
            جامعہ بلال الاسلامیہ میں اساتذۂ کرام طلبہ کی علمی، عملی اور اخلاقی تربیت کے لیے مصروفِ خدمت ہیں۔
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredFaculty.map((teacher) => (
            <div key={teacher.id} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-xl font-black text-white">
                {teacher.id}
              </div>
              <h3 className="mt-4 text-lg font-bold leading-8 text-blue-950">{teacher.name}</h3>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/faculty" className="inline-block rounded-xl bg-blue-800 px-7 py-3 font-bold text-white transition hover:bg-blue-900">
            تمام {faculty.length} اساتذہ کی فہرست
          </Link>
        </div>
      </div>
    </section>
  );
}

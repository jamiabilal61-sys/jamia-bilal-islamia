import { news } from "@/lib/news";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default function NewsDetails({ params }: Props) {

  const article = news.find(
    (item) => item.id === Number(params.id)
  );

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">

      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
        {article.category}
      </span>

      <h1 className="text-5xl font-bold text-blue-900 mt-6 leading-tight">
        {article.title}
      </h1>

      <p className="mt-4 text-gray-500">
        {article.date}
      </p>

      <div className="relative h-[500px] mt-10 rounded-3xl overflow-hidden">

        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />

      </div>

      <div className="mt-12 text-lg leading-10 text-gray-700">

        <p>
          {article.excerpt}
        </p>

        <p className="mt-8">
          یہ خبر کا مکمل صفحہ ہے۔ بعد میں یہاں مکمل خبر،
          تصاویر، PDF، ویڈیوز اور متعلقہ معلومات Admin Panel
          کے ذریعے شامل کی جا سکیں گی۔
        </p>

      </div>

    </main>
  );
}
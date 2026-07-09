import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
};

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <section className="bg-blue-900 text-white py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <nav className="text-blue-200 text-sm mb-5">

          <Link
            href="/"
            className="hover:text-yellow-300"
          >
            صفحہ اول
          </Link>

          <span className="mx-2">/</span>

          <span>{title}</span>

        </nav>

        <h1 className="text-5xl font-bold">

          {title}

        </h1>

        <p className="mt-6 text-xl text-blue-100">

          {subtitle}

        </p>

      </div>

    </section>
  );
}
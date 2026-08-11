import Link from "next/link";

type Props = {
  title: string;
  description: string;
  icon: string;
  items?: string[];
  action?: { label: string; href: string };
};

export default function PublicInfoPage({ title, description, icon, items = [], action }: Props) {
  return (
    <main className="bg-slate-50 py-16 sm:py-24">
      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-5 text-6xl" aria-hidden="true">{icon}</div>
          <h1 className="text-3xl font-black text-blue-950 sm:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">{description}</p>
          {items.length > 0 && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-950">✓ {item}</li>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            {action && <Link href={action.href} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white">{action.label}</Link>}
            <Link href="/" className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700">مرکزی صفحہ</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

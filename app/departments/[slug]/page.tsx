type Props = {
  params: {
    slug: string;
  };
};

export default function DepartmentDetails({ params }: Props) {
  return (
    <main className="py-24">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-blue-900">

          {params.slug}

        </h1>

        <p className="mt-8 text-lg leading-9 text-gray-700">

          یہ صفحہ مستقبل میں اس شعبہ کی مکمل معلومات دکھائے گا۔

        </p>

      </div>

    </main>
  );
}
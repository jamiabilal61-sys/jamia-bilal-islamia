type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  badge,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">

      {badge && (
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {badge}
        </span>
      )}

      <h2 className="text-5xl font-bold text-blue-900 mt-5">
        {title}
      </h2>

      {description && (
        <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
          {description}
        </p>
      )}

    </div>
  );
}
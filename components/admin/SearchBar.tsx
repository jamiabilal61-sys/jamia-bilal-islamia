interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="نام یا موبائل نمبر سے تلاش کریں..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-700 outline-none"
    />
  );
}
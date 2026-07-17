export default function Pagination() {
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
        ←
      </button>

      <button className="px-4 py-2 bg-blue-700 text-white rounded-lg">
        1
      </button>

      <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
        2
      </button>

      <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
        3
      </button>

      <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
        →
      </button>
    </div>
  );
}
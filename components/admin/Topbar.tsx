export default function Topbar() {
  return (
    <header className="bg-white border-b shadow-sm">

      <div className="h-20 px-8 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            جامعہ بلال الاسلامیہ لاہور
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Admin Dashboard
          </p>

        </div>

        <div className="flex items-center gap-6">

          <button className="relative text-2xl hover:scale-110 transition">
            🔔

            <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              3
            </span>

          </button>

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center text-xl font-bold">
              A
            </div>

            <div>

              <p className="font-semibold">
                Administrator
              </p>

              <p className="text-sm text-gray-500">
                admin@jbi.edu.pk
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 whitespace-nowrap">
          Mushroom Inventory
        </h1>

        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search name or part number..."
            className="w-full max-w-xl rounded-full px-5 py-2 border border-gray-300
                       focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                       outline-none text-sm shadow-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded hover:bg-gray-100">
            🔍
          </button>

          <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <a href="/login"><button className="hidden sm:block text-sm px-4 py-2 rounded-md
                             bg-emerald-600 text-white hover:bg-emerald-700">
            Login
          </button></a>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
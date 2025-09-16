export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}: SearchBarProps) {
  return (
    <div className="flex justify-between w-full max-w-4xl my-4">
      <ul className="flex space-x-4">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`cursor-pointer hover:text-orange-400 duration-300 transition-all ${
              category === cat && "text-orange-500 font-bold"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded px-3 py-1 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

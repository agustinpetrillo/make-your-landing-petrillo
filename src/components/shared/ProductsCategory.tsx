"use client";

import { useEffect, useState } from "react";
import products from "@/../products.json";
import Products from "../Products";

const CATEGORIES = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function ProductsCategory() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [data, setData] = useState<ProductProps[]>(products);

  useEffect(() => {
    let filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setData(filtered);
  }, [search, category]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-4xl my-4">
        <ul className="flex space-x-4">
          {CATEGORIES.map((cat) => (
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

      <Products data={data} />
    </div>
  );
}

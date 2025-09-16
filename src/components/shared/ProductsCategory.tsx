"use client";

import { useEffect, useState } from "react";
import ProductsContainer from "../containers/ProductsContainer";
import SearchBar from "./SearchBar";
import { getProducts } from "@/lib/firestore";

export default function ProductsCategory() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("All");
  const [data, setData] = useState<ProductProps[]>([]);
  const [filteredData, setFilteredData] = useState<ProductProps[]>([]);

  const CATEGORIES = [
    "All",
    ...new Set(data.map((product) => product.category)),
  ];

  const fetchProductsData = async () => {
    setLoading(true);

    try {
      const data = await getProducts();
      setData(data as ProductProps[]);
      setFilteredData(data as ProductProps[]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  useEffect(() => {
    let filtered =
      category === "All"
        ? data
        : data.filter((product) => product.category === category);

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [search, category, data]);

  return (
    <div className="flex flex-col items-center">
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={CATEGORIES}
      />
      {!loading ? (
        <ProductsContainer data={filteredData} />
      ) : (
        <div className="flex justify-center items-center my-10">
          <p className="text-gray-500 text-lg font-semibold">Loading...</p>
        </div>
      )}
    </div>
  );
}

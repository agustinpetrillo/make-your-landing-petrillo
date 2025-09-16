"use client";

import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
// import Image from 'next/image'

export default function ProductsContainer({ data }: { data: ProductProps[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center my-10">
        <p className="text-gray-500 text-lg font-semibold">Not found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-10 my-6">
      {data.map((product) => (
        <div
          key={product.firestoreId}
          className="border rounded-2xl p-4 flex flex-col items-center"
        >
          {/* <Image src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" /> */}
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <p className="text-green-600 mb-2">${product.price}</p>
          <div className="flex items-center space-x-6">
            <AddToCartButton product={product} />
            <Link
              href={`/product/${product.slug}`}
              className="bg-orange-400 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-orange-600"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from 'next/image'

export default function Products({ data }: { data: ProductProps[] }) {
  const router = useRouter();

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
          key={product.id}
          className="border rounded-2xl p-4 flex flex-col items-center cursor-pointer"
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          {/* <Image src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" /> */}
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <p className="text-green-600 mb-2">${product.price}</p>
          <Link
            href={`/product/${product.slug}`}
            className="bg-orange-400 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-orange-600"
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}

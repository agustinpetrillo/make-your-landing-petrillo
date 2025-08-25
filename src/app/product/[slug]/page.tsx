import { notFound } from "next/navigation";
// import Image from "next/image";
import products from "@/../products.json";

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      {/* <Image
        src={`/${product.image}`}
        alt={product.name}
        className="w-64 h-64 object-contain mb-6"
      /> */}
      <p className="text-lg text-white mb-2">Category: {product.category}</p>
      <p className="text-lg text-green-600 mb-2">Price: ${product.price}</p>
      <p className="text-lg text-white mb-2">Stock: {product.stock}</p>
    </div>
  );
}

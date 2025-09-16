// app/products/[slug]/page.tsx (Client-side version)
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "products"),
          where("slug", "==", params.slug)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setNotFoundError(true);
          return;
        }

        const doc = querySnapshot.docs[0];
        const productData = {
          firestoreId: doc.data().id,
          name: doc.data().name,
          slug: doc.data().slug,
          category: doc.data().category,
          price: doc.data().price,
          stock: doc.data().stock,
          image: doc.data().image,
        };

        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-10 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFoundError || !product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      {/* <div className="mb-6">
        <Image
          src={`/${product.image}`}
          alt={product.name}
          className="w-64 h-64 object-contain rounded"
        />
      </div> */}

      {/* Product Details */}
      <div className="space-y-2 mb-6">
        <p className="text-lg text-white mb-2">Category: {product.category}</p>
        <p className="text-lg text-green-600 mb-2">Price: ${product.price}</p>
        <p className="text-lg text-white mb-2">Stock: {product.stock}</p>
      </div>

      {/* Add to Cart Section */}
      <div className="flex items-center gap-4">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

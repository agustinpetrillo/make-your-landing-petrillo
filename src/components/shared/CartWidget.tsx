"use client";

import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CartWidget() {
  const { cartCount } = useGlobalContext();
  return (
    <Link href="/cart" className="flex gap-1 items-center">
      <FaShoppingCart className="w-6 h-6" />
      <div className="rounded-full bg-orange-400 h-7 w-7 flex items-center justify-center">
        <p className="font-semibold text-white text-sm">{cartCount}</p>
      </div>
    </Link>
  );
}

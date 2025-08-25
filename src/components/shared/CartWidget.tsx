"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function CartWidget() {
  return (
    <Link href="/cart" className="flex gap-1 items-center">
      <FaShoppingCart className="w-6 h-6" />
      <div className="rounded-full bg-orange-400 h-7 w-7 flex items-center justify-center">
        <p className="font-semibold text-white text-sm">1</p>
      </div>
    </Link>
  );
}

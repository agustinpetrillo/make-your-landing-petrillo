import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/assets/imgs/logo.png";
import CartWidget from "./reutilizable/CartWidget";

export default function Navbar() {
  return (
    <nav className="w-full min-h-0 py-2 px-10 flex justify-between items-center bg-black backdrop-blur-lg">
      <Link href="/">
        <Image src={logo} alt="logo" height={60} width={60} />
      </Link>
      <div className="flex gap-12">
        <div className="space-x-8">
          <Link
            href="/"
            className="hover:text-orange-400 duration-300 transition-all"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="hover:text-orange-400 duration-300 transition-all"
          >
            Contact
          </Link>
        </div>
        <CartWidget />
      </div>
    </nav>
  );
}

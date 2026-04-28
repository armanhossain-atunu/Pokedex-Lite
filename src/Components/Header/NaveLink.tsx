"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md transition-all duration-200 
     ${
       pathname === path
         ? "bg-blue-600 text-white font-semibold"
         : "text-gray-600 hover:bg-gray-200 hover:text-black"
     }`;

  return (
    <div className="flex flex-col mx-auto font-medium md:flex-row gap-2">
      <Link href="/" className={linkClass("/")}>
        Home
      </Link>

      <Link href="/about" className={linkClass("/about")}>
        About
      </Link>
      <Link href="/contact" className={linkClass("/contact")}>
       Contact
      </Link>
    </div>
  );
};

export default NavLink;
"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useHome } from "@/hooks/use-home";
import Link from "next/link";

const navbarMenu = [
  { href: "/v1", label: "v1" },
  { href: "/v2", label: "v2" },
];

export function NavbarBtn() {
  const { nav, openNav, closeNav } = useHome();

  const onClick = () => {
    if (nav) {
      closeNav();
    } else openNav();
  };

  return (
    <div className="block sm:hidden">
      <Button onClick={onClick} className="flex items-center justify-center" variant={"outline"} size={"icon"}>
        <div className={`${nav ? "rotate-180" : ""} transition`}>
          {nav ? <FaXmark size={20} /> : <FaBars size={20} />}
        </div>
      </Button>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const { nav, closeNav } = useHome();

  const onClick = () => {
    if (nav) closeNav();
  };

  return (
    <nav
      className={`${className} ${
        nav ? "scale-y-100" : "scale-y-0"
      } transition origin-top md:scale-y-100 fixed md:static top-16 left-0 right-0 bg-white md:bg-inherit shadow-md md:shadow-none`}
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-4 md:p-0">
        {navbarMenu.map((item, i) => (
          <Link
            onClick={onClick}
            href={item.href}
            key={i}
            className={`${nav ? "text-primary" : "text-muted-foreground"} py-2 md:py-0 text-sm`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

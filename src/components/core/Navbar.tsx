"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Navbar: React.FunctionComponent = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Browse Event", href: "/events" },
    { label: "Create Event", href: "/create" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="px-24 py-4 fixed z-50 w-full bg-white shadow">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
          <p>LOGO</p>
          </Link>
        </div>
        <nav>
          <ul className="flex gap-8 text-muted-foreground">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={`hover:text-primary ${
                  pathname === link.href ? "text-primary font-semibold" : ""
                }`}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2">
          <Link href={"/sign-in"}>
            <Button variant={"ghost"} className="text-primary cursor-pointer">
              Login
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button className="cursor-pointer">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

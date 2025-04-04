import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";

interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <div className="px-24 py-4 fixed z-50 w-full bg-white shadow">
      <div className="flex justify-between items-center">
        <div>
          <p>LOGO</p>
        </div>
        <nav>
          <ul className="flex gap-8 text-muted-foreground">
            <li className="hover:text-primary">
              <Link href={"/#"}>Browse Event</Link>
            </li>
            <li className="hover:text-primary">
              <Link href={"/#"}>Create Event</Link>
            </li>
            <li className="hover:text-primary">
              <Link href={"/#"}>About</Link>
            </li>
            <li className="hover:text-primary">
              <Link href={"/#"}>Contact</Link>
            </li>
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

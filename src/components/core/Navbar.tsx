"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CirclePlus, Info, Menu, Phone, Search } from "lucide-react";
import { apiCall } from "@/utils/apiHelper";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { setSignIn, setSignOut } from "@/lib/redux/features/authSlice";

const Navbar: React.FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: "Browse Event", href: "/events", icon: <Search /> },
    // { label: "Create Event", href: "/create-event", icon: <CirclePlus /> },
    { label: "Organizers", href: "/organizers", icon: <Phone /> },
    { label: "About", href: "/about", icon: <Info /> },
  ];

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.authState;
  });

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("tkn");
      if (token) {
        const response = await apiCall.get(`/auth/keepLogin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Sign In Response: ", response.data);
        dispatch(
          setSignIn({
            id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            token: response.data.token,
            is_verified: response.data.is_verified,
            role: response.data.role,
            code: response.data.code,
            points: response.data.points,
          })
        );
        localStorage.setItem("tkn", response.data.token);
      } else {
        dispatch(setSignIn({ isAuth: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);

  return (
    <div className="px-4 py-2 md:px-24 md:py-4 fixed z-50 w-full bg-white shadow">
      <div className="flex justify-between items-center">
        <div>
          <Link href={user.role === "organizer" ? "/dashboard" : "/"}>
            <p>LOGO</p>
          </Link>
        </div>
        <div
          className={`flex md:flex-row flex-row-reverse justify-between items-center gap-2 md:gap-0 ${
            user.role === "organizer" ? "" : "md:w-[60%]"
          }`}
        >
          {user.role === "organizer" ? (
            ""
          ) : (
            <nav>
              <ul className="md:flex gap-8 text-muted-foreground hidden justify-center">
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
          )}

          <nav className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuGroup>
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2"
                      >
                        {link.icon} <span>{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex gap-2 items-center">
            {user.email ? (
              <>
                <span>
                  <Link href="/profile">
                    {user.first_name} {user.last_name}
                  </Link>
                </span>
                <Button
                  className="text-white cursor-pointer"
                  type="button"
                  onClick={() => {
                    dispatch(setSignOut());
                    localStorage.removeItem("tkn");
                    router.replace("/");
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href={"/sign-in"}>
                  <Button
                    variant={"ghost"}
                    className="text-primary cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button className="cursor-pointer">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

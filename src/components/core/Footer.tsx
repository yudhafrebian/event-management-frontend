import Link from "next/link";
import * as React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Separator } from "../ui/separator";


const Footer = () => {
  return (
    <footer className="bg-[#111827] px-20 py-7">
      <div className="grid grid-cols-4 gap-10 place-content-center">
        <div>
          <h1 className="text-white text-2xl font-bold">Nama Event</h1>
          <p className="text-[#9CA3AF] mt-5">
            Making event management simple and efficient for everyone.
          </p>
        </div>
        <div>
          <p className="text-white font-bold">Quick Links</p>
          <ul className="text-[#9CA3AF] mt-5">
            <li >
              <Link className="hover:text-primary" href={"#"}>Browse Events</Link>
            </li>
            <li className="mt-2">
              <Link className="hover:text-primary" href={"#"}>Create Event</Link>
            </li>
            <li className="mt-2">
              <Link className="hover:text-primary" href={"#"}>About</Link>
            </li>
            <li className="mt-2">
              <Link className="hover:text-primary" href={"#"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-white font-bold">Support</p>
          <ul className="text-[#9CA3AF] mt-5">
            <li >
              <Link className="hover:text-primary" href={"#"}>Help Center</Link>
            </li>
            <li className="mt-2">
              <Link className="hover:text-primary" href={"#"}>Terms of Service</Link>
            </li>
            <li className="mt-2">
              <Link className="hover:text-primary" href={"#"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
            <p className="text-white font-bold">Follow Us</p>
            <div className="flex gap-2 text-[#9CA3AF] mt-5">
                <FaFacebook size={24}/>
                <FaSquareXTwitter size={24} />
                <FaInstagram size={24} />
                <FaLinkedin size={24} />
            </div>
        </div>
      </div>
      <Separator className="my-8"/>
      <div>
        <p className="text-[#9CA3AF] text-center">© 2023 Nama Event. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

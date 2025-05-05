// components/dashboard/Sidebar.tsx
"use client";

import { Calendar, CircleDollarSign, Gauge, Settings, TicketIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="flex flex-col gap-4 pt-20">
      <Link href="/dashboard" className="hover:text-gray-300 flex gap-2"><Gauge /> Dashboard</Link>
      <Link href="/dashboard/event" className="hover:text-gray-300 flex gap-2"><Calendar /> Events</Link>
      <Link href="/dashboard/promotion" className="hover:text-gray-300 flex gap-2"><TicketIcon /> Promotion</Link>
      <Link href="/dashboard/transactions" className="hover:text-gray-300 flex gap-2"><CircleDollarSign /> Transactions</Link>
      <Link href="/dashboard/settings" className="hover:text-gray-300 flex gap-2"><Settings /> Settings</Link>
    </nav>
  );
};

export default Sidebar;

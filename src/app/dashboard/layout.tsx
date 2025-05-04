import Sidebar from "@/components/core/Sidebar";
import React from "react";


export default function DashboardLayout({children}:{children:React.ReactNode}){
    return (
        <div className="flex min-h-screen">
            <aside className="w-1/6 bg-gray-400 text-white p-4">
                <Sidebar />
            </aside>
            <main>
                {children}
            </main>
        </div>
    )
}
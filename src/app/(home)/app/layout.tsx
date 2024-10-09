"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // This state controls the sidebar toggle

  return (
    <div className="flex h-screen text-black bg-white">
      <Sidebar sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <main
        className={`flex-grow p-4 overflow-y-auto transition-all duration-300 ease-in-out
        ${sidebarOpen ? "ml-64" : "ml-0"}`} // This class controls the main content margin
      >
        {children}
      </main>
    </div>
  );
}


import React from "react";
import UserSection from "./UserSection";
import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import { PanelsTopLeft } from "lucide-react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  return (
    <>
      {/* Sidebar Toggle Button */}
      <div
        className={`absolute ml-2 mt-2 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "left-64" : "left-2"
        }`}
      >
        <PanelsTopLeft
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-gray-800 cursor-pointer"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-100 transition-all duration-300 ease-in-out overflow-y-auto
        ${sidebarOpen ? "w-64" : "w-0"} flex flex-col`}
      >
        <div className="p-4 text-xl font-medium">ProFlow</div>
        <nav className="flex flex-col gap-7 space-x-4 text-base">
          <UserSection />
          <TaskSection />
          <ProjectSection />
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

"use client";
import { usePathname } from "next/navigation";
import TaskPage from "@/components/TaskPage";

function Home() {
  const pathName = usePathname();

  return (
   <TaskPage pathName={pathName} pageName="project"/>
  );
}

export default Home;

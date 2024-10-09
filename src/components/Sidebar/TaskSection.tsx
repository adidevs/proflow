"use client";
import {
  ListTodo,
  Sun,
  CalendarDays,
  Database,
  SquareCheckBig,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

function TaskSection() {
  const router = useRouter();
  const pathName = usePathname();
  const page = pathName.split("/")[2];
  return (
    <div>
      <h3 className="flex flex-row items-center justify-between mr-2">
        <div className="flex flex-row items-center gap-2">
          <ListTodo />
          <span className="font-semibold">Tasks</span>
        </div>
      </h3>
      <ul className="list-none my-2 text-sm">
        <li
          className={`flex flex-row items-center gap-2 my-1 cursor-pointer pt-1 mr-1 rounded-sm ${
            page === "today" && ` bg-blue-200`
          }`}
          onClick={() => router.push("/app/today")}
        >
          <Sun width={20} /> Today
        </li>
        <li
          className={`flex flex-row items-center gap-2 my-1 cursor-pointer pt-1 mr-1 rounded-sm ${
            page === "tomorrow" && ` bg-blue-200`
          }`}
          onClick={() => router.push("/app/tomorrow")}
        >
          <CalendarDays width={20} /> Tomorrow
        </li>
        <li
         className={`flex flex-row items-center gap-2 my-1 cursor-pointer pt-1 mr-1 rounded-sm ${
          page === "tasks" && ` bg-blue-200`
        }`}
          onClick={() => router.push("/app/tasks")}
        >
          <Database width={20} />All tasks
        </li>
        <li
          className={`flex flex-row items-center gap-2 my-1 cursor-pointer pt-1 mr-1 rounded-sm ${
            page === "completed" && ` bg-blue-200`
          }`}
          onClick={() => router.push("/app/completed")}
        >
          <SquareCheckBig width={20} /> Completed Tasks
        </li>
      </ul>
    </div>
  );
}

export default TaskSection;

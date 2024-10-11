import {
  SlidersHorizontal,
  Rows3,
  SquareKanban,
  User,
  CalendarClock,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Hash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjects } from "@/store";

export default function ViewSelector({
  page,
  view,
  setView,
  grouping,
  setGrouping,
  sorting,
  setSorting,
  filterProject,
  setFilterProject,
}: {
  page: string | undefined;
  view: string;
  setView: React.Dispatch<React.SetStateAction<any>>;
  grouping: string;
  setGrouping: React.Dispatch<React.SetStateAction<any>>;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<any>>;
  filterProject: string;
  setFilterProject: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { projects } = useProjects((state) => state);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row gap-2 items-center text-xs text-gray-600 ">
          <SlidersHorizontal width={15} /> Views
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Views</DropdownMenuLabel>
        <div className="grid grid-flow-col items-center justify-around font-light">
          <DropdownMenuItem
            className={`flex flex-col w-24 text-sm items-center gap-2 hover:text-gray-500 ${
              view === "list" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setView("list")}
          >
            <Rows3 size={20} />
            List
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex flex-col w-24 text-sm items-center gap-2 hover:text-gray-500${
              view === "kanban" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setView("kanban")}
          >
            <SquareKanban size={20} />
            Board
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Group by</DropdownMenuLabel>
          <DropdownMenuItem
            className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
              grouping === "assignee" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setGrouping("assignee")}
          >
            <User size={20} />
            Assignee
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
              grouping === "deadline" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setGrouping("deadline")}
          >
            <CalendarClock size={20} />
            Deadline
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
              grouping === "project" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setGrouping("project")}
          >
            <Hash size={20} />
            Project
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
              grouping === "priority" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setGrouping("priority")}
          >
            <CalendarClock size={20} />
            Priority
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
              grouping === "label" && "text-gray-900 bg-gray-200"
            }`}
            onClick={() => setGrouping("label")}
          >
            <CalendarClock size={20} />
            Label
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sort (Deadline)</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex flex-row items-center font-light text-gray-600 gap-2">
              <ArrowUpDown size={20} />
              Direction
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
                  sorting === "asc" && "text-gray-900 bg-gray-200"
                }`}
                onClick={() => {
                  setSorting("asc");
                }}
              >
                <ArrowDown size={20} />
                Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
                  sorting === "desc" && "text-gray-900 bg-gray-200"
                }`}
                onClick={() => {
                  setSorting("desc");
                }}
              >
                <ArrowUp size={20} />
                Descending
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className={`${(page === "project") && `hidden`}`}>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex flex-row items-center font-light text-gray-600 gap-2 w-[100%]">
              <Hash size={20} />
              Project
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {projects.map((project) => (
                <DropdownMenuItem
                  className={`flex flex-row items-center font-light text-gray-600 gap-2 ${
                    filterProject === project?._id && "text-gray-900 bg-gray-200"
                  }`}
                  key={project?._id}
                  onClick={() => {setFilterProject(project?._id)}}
                >
                  {project?.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                className="font-semibold"
                onClick={() => {
                  setFilterProject("false");
                }}
              >
                Remove Filter
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

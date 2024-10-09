"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Hash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useProjects } from "@/store";

export default function ProjectSelector({
  project_id,
  setProject,
}: {
  project_id: string | undefined;
  setProject: React.Dispatch<React.SetStateAction<any>>;
}) {

  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(project_id);
  const { projects, getProject } = useProjects((state) => state);

  useEffect(() => {
    const selectedProject = getProject(selectedProjectId);
    setProject(selectedProject);
  }, [selectedProjectId]);

  const firstProjectName = project_id
    ? getProject(project_id)?.name
    : projects.length > 0
    ? projects[0].name
    : "No projects";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-xs flex flex-row justify-between gap-1 items-center rounded-xl p-[5px]">
            <Hash size={12} />{" "}
            {getProject(selectedProjectId)?.name || firstProjectName}
            <ChevronDown size={10} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuLabel className="text-xs">
            Choose Project
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={selectedProjectId}
            onValueChange={setSelectedProjectId}
          >
            {projects &&
              projects.map((project, index) => (
                <DropdownMenuRadioItem
                  key={index}
                  value={project?._id}
                  className="text-xs"
                >
                  {project.name}
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

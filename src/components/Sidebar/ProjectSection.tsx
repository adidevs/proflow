"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { FolderOpenDot, Hash } from "lucide-react";
import { CreateProjectDialog } from '@/components/CreateProjectDialog';
import { useProjects } from "@/store";

function ProjectSection() {
  const router = useRouter();
  const pathName = usePathname();
  const page = pathName.split("/")[3];
  const { data: session, status } = useSession();
  const { projects, setProjects } = useProjects(state => state);


  const fetchProjects = async () => {
    if (session) {
      fetch(`/api/projects?user_email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.projects.length == 0) {
            setProjects([]);
          }
          setProjects(data.projects);
        });
    }
  };

  useEffect(() => {
    if(status === "authenticated"){
      fetchProjects();
    }
  }, [session]);

 

  return (
    <div>
      <h3 className="flex flex-row items-center justify-between mr-2">
        <div className="flex flex-row items-center gap-2">
          <FolderOpenDot />
          <span className="font-semibold">Projects</span>
        </div>

       <CreateProjectDialog />
      </h3>
      <ul className="list-none my-2 text-sm">
        {projects.length == 0
          ? "Create or Join a Project!"
          : projects.map((project, index) => (
              <li className={`flex flex-row items-center gap-2 cursor-pointer p-1 mr-1 rounded-sm ${
                page === `${project?._id}` && ` bg-blue-200`
              }`} key={index} >
                <Hash width={20} />
                <div className="cursor-pointer" onClick={() => router.push(`/app/projects/${project._id}`)}>{project?.name}</div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default ProjectSection;

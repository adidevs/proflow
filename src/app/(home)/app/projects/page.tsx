"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { useProjects } from "@/store";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { projects, setProjects, removeProject } = useProjects(
    (state) => state
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      const user = {
        user_email: session?.user.email,
      };
      fetch(`/api/projects?user_email=${user.user_email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.projects.length == 0) {
            setProjects([]);
          }
          setProjects(data.projects);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Failed to fetch projects");
          setLoading(false);
        });
    };
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [session]);

  const handleDeleteProject = async (id: string, owner: string) => {
    if (owner !== session?.user.email) {
      toast.error("You are not the owner of this project!");
      return;
    }
    const project = {
      project_id: id,
    };
    fetch("/api/projects/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) removeProject(id);
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error("Failed to delete project");
      });
  };

  return (
    <div className="mt-12 lg:mx-28">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">My Projects</h1>
        <CreateProjectDialog />
      </div>
      {loading ? (
        <div className="w-full pt-40 z-10 flex flex-col items-center justify-center bg-opacity-15">
          <Image src="/loading.svg" alt="Loading..." width={50} />
        </div>
      ) : (
        <div>
          <div className="text-sm font-semibold">
            {projects && `${projects.length}`} Projects
          </div>
          <div>
            {projects.length == 0 ? (
              <div className="w-full text-center flex justify-center my-36 font-semibold text-gray-700">
                Create or Join a Project! Your projects will appear here.
              </div>
            ) : (
              <ul className="list-none flex flex-col gap-2 mt-2 justify-center items-center">
                {Array.isArray(projects) &&
                  projects.map((project) => (
                    <li
                      className="text-lg my-2 w-full bg-slate-50 rounded-sm flex justify-between items-center"
                      key={project._id}
                    >
                      <div className="flex flex-col">
                        <div
                          className=" text-lg font-semibold cursor-pointer"
                          onClick={() => {
                            router.push(`/app/projects/${project._id}`);
                          }}
                        >
                          {project.name}
                        </div>
                        <div className="font-light text-sm">
                          {project.description}
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash2
                            size={20}
                            className="text-gray-300 hover:text-gray-800"
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your project and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteProject(project._id, project.owner)
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

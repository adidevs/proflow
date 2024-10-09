"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Pencil, Trash2, MoveRight } from "lucide-react";
import { AddMemberDialog } from "@/components/AddMemberDialog";
import { toast } from "react-toastify";
import { useProjects } from "@/store";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

function UpdateProjectDialog({
  project_id,
  name,
  description,
}: {
  project_id: string;
  name: string | undefined;
  description: string | undefined;
}) {
  const { updateProject } = useProjects((state) => state);
  const [editedProject, setEditedProject] = useState({
    project_id: project_id,
    name: name,
    description: description,
  });

  const handleNewProject = () => {
    if (!editedProject.name || !editedProject.description) {
      toast.error("Please fill all fields!");
      return;
    }
    fetch("/api/projects/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProject),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.project) {
          updateProject(data.project);
          toast.success("Project updated successfully!");
        } else {
          toast.error("Project not updated!");
        }
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pencil className="cursor-pointer text-gray-400 hover:text-gray-700" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Update Project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Update the name and description of your project
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={name}
              placeholder="Project Name"
              className="col-span-3"
              onChange={(e) =>
                setEditedProject((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue={description}
              placeholder="Project Description"
              className="col-span-3"
              onChange={(e) =>
                setEditedProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleNewProject}>
              Update Project
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Page({ params: { project_id } }: { params: { project_id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { removeMember, removeProject, getProject, setProject } = useProjects(
    (state) => state
  );
  const project = getProject(project_id);

  useEffect(() => {
    fetch(`/api/projects/id?project-id=${project_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  }, []);

  const handleDeleteMember = async (member_email: string) => {
    if (member_email === project?.owner) {
      toast.error("Cannot remove owner! You can delete the project instead.");
      return;
    }
    if (member_email === session?.user.email) {
      toast.error("Cannot remove yourself! Request the owner to remove you.");
      return;
    }
    const member = {
      project_id: project_id,
      member_email: member_email,
    };
    fetch(`/api/projects/members/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          removeMember(project_id, member_email);
        }
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };

  const handleDeleteProject = async (id: string|undefined, owner: string | undefined) => {
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
        if (data.status === 200) removeProject(id || "");
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error("Failed to delete project");
      });
  };

  return (
    <>
      <Head>
        <title>{project?.name}</title>
        <meta name="description" content={project?.description} />
      </Head>
      <div className="mt-12 lg:mx-28">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">{project?.name}</h1>
            <p className="text-base">{project?.description}</p>
          </div>
          <div
            className={`flex flex-row items-center justify-between gap-1 ${
              session?.user.email === project?.owner ? `block` : `hidden`
            }`}
          >
            <UpdateProjectDialog
              project_id={project_id}
              name={project?.name}
              description={project?.description}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2
                  size={30}
                  className="text-gray-400 hover:text-gray-800"
                />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your project and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDeleteProject(project?._id, project?.owner);
                      router.push("/app/tasks");
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div
          className="mt-4 hover:underline flex flex-row items-center gap-1"
          onClick={() => {
            router.push(`/app/projects/${project_id}/tasks`);
          }}
        >
          Go To Project Tasks <MoveRight size={20} />
        </div>
        <div className="mt-4">
          <div className="flex flex-rol mb-2 justify-between items-center">
            <h2>Members</h2>
            <div>
              <AddMemberDialog
                project_owner={project?.owner}
                project_id={project_id}
                members={project?.members}
              />
            </div>
          </div>
          <ul className="list-none">
            {project?.members.map((member) => (
              <li
                key={member.email}
                className="px-2 py-1 flex flex-row justify-between items-center hover:bg-gray-200 group"
              >
                <div className="flex flex-col">
                  <div className="text-base">
                    {member.name ? member.name : "Anonymous"}
                  </div>
                  <div className="text-sm font-light text-gray-600">
                    {member.email}
                  </div>
                </div>
                {project?.owner === session?.user.email && (
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2
                          size={20}
                          className="text-gray-100 group-hover:text-gray-800"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove {member.name}({member.email}) from
                            the project! You will have to add them back.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteMember(member.email)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Page;

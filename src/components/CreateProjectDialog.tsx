"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { Plus, Loader as LoadIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useProjects } from "@/store";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export function CreateProjectDialog() {
  const router = useRouter();
  const { addProject } = useProjects((state) => state);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    owner: session?.user.email,
    owner_name: session?.user.name,
    generateAITasks: false,
  });

  useEffect(() => {
    setNewProject((prev) => ({
      ...prev,
      owner: session?.user.email,
      owner_name: session?.user.name,
    }));
  }, [session]);

  const handleNewProject = (updatedProject: any) => {
    if (!updatedProject.name || !updatedProject.description) {
      toast.error("Please fill all fields!");
      setLoading(false);
      return;
    }
    fetch("/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then((res) => res.json())
      .then((data) => {
        addProject(data.project);
        setLoading(false);
        toast.success("Project created successfully!");
        router.push(`/app/projects/${data.project._id}`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <Dialog>
      {loading && <Loader />}
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Plus className="cursor-pointer text-gray-400 hover:text-gray-700" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new project</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Create A New Project</DialogTitle>
          <DialogDescription>
            Add a new project to your workspace to collaborate with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 pr-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Project Name"
              className="col-span-3"
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Project Description"
              className="col-span-3"
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose className="flex flex-row items-center justify-center gap-2">
            <Button
              className="flex flex-row items-center gap-1 m-1"
              onClick={() => {
                handleNewProject({ ...newProject, generateAITasks: true });
              }}
            >
              <LoadIcon size={20} />
              Add Project{" "}
              <span className="text-xs">(with AI Generated Tasks)</span>
            </Button>
            <Button
              className="ml-1 hover:bg-gray-200"
              variant="secondary"
              type="submit"
              onClick={() => {
                setLoading(true);
                handleNewProject(newProject);
              }}
            >
              Add Project
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

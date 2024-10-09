"use client";
import { useState } from "react";
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
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useProjects } from "@/store";

export function AddMemberDialog({
  project_owner,
  project_id,
  members,
}: {
  project_owner: string | undefined;
  project_id: string;
  members: { name: string; email: string }[] | undefined;
}) {
  const { data: session } = useSession();
  const { addMember } = useProjects((state) => state);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    project_id: project_id,
  });

  const handleNewProject = (e: any) => {
    if (!newMember.email || !newMember.name) {
      toast.error("Please fill all fields!");
      return;
    }
    if (members?.find((member) => member.email === newMember.email)) {
      toast.error("Member already exists");
      return;
    }
    e.preventDefault();
    fetch("/api/projects/members/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          addMember(newMember.project_id, newMember.name, newMember.email);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      {project_owner === session?.user.email && (
        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Plus className="cursor-pointer text-gray-400 hover:text-gray-700" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new Member</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add a new member</DialogTitle>
              <DialogDescription>
                Add a new member to the project by entering their name and email
                address.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Member Name"
                  className="col-span-3"
                  onChange={(e) =>
                    setNewMember((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="description"
                  placeholder="Member Email"
                  className="col-span-3"
                  onChange={(e) =>
                    setNewMember((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogClose>
              <DialogFooter>
                <Button onClick={(e) => handleNewProject(e)}>Add Member</Button>
              </DialogFooter>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, Plus, UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useProjects } from "@/store";

function AssignSelector({
  assignedTo,
  setEditedTask,
  project_id,
}: {
  assignedTo: { name: string; email: string } | undefined;
  setEditedTask: React.Dispatch<React.SetStateAction<any>>;
  project_id: string;
}) {
  const { getProject, addMember } = useProjects((state) => state);
  const [assignee, setAssignee] = useState(assignedTo?.email || undefined);
  const [assigneeName, setAssigneeName] = useState(
    assignedTo?.name || undefined
  );
  const [newMember, setNewMember] = useState({ name: "", email: "" });
  const members = getProject(project_id)?.members;

  useEffect(() => {
    if (assignee === "null") {
      setAssigneeName("Unassigned");
      setEditedTask((prevTask: any) => ({
        ...prevTask,
        assignedTo: {
          name: "Unassigned",
          email: "null",
        },
      }));
    } else {
      const newAssigneeName =
        members && members.find((member) => member.email === assignee)?.name;
      setAssigneeName(newAssigneeName);
      setEditedTask((prevTask: any) => ({
        ...prevTask,
        assignedTo: {
          name: newAssigneeName,
          email: assignee,
        },
      }));
    }
  }, [assignee, members, setEditedTask]);

  const handleNewMember = () => {
    const postNewMember = async () => {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });
      const data = await res.json();
      if (data.status === "error") {
        toast.error(data.message);
      } else if (data.status === "success") {
        toast.success(data.message);
        addMember(project_id, newMember.name, newMember.email);
      }
    };
    postNewMember();
  };

  return (
    <div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs flex flex-row justify-between gap-1 items-center rounded-xl p-[5px]">
              <UserRound size={12} /> {assigneeName}
              <ChevronDown size={10} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel className="text-xs">
              Change Assignee
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={assignee}
              onValueChange={setAssignee}
            >
              {members &&
                members.map((member, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={member.email}
                    className="text-xs"
                  >
                    {member.name}
                  </DropdownMenuRadioItem>
                ))}
              <DropdownMenuRadioItem value="null" className="text-xs">
                Unassigned
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuGroup>
              <DialogTrigger>
                <DropdownMenuItem className="w-32 text-xs flex flex-row justify-between items-center my-auto mx-0">
                  <div>Add new member</div>
                  <Plus size={15} />
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>New Member</DialogTitle>
            <DialogDescription>
              Add a new member to your project to help you organize your tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                New Member Name
              </Label>
              <Input
                id="name"
                placeholder="Add new member name"
                className="col-span-3"
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                New Member Email
              </Label>
              <Input
                id="email"
                placeholder="Add new member email"
                className="col-span-3"
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleNewMember}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AssignSelector;

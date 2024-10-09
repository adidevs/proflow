"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useProjects } from "@/store";

function LabelSelector({
  label,
  setEditedTask,
  project_id,
}: {
  label: string;
  setEditedTask: React.Dispatch<React.SetStateAction<any>>;
  project_id: string;
}) {
  const { getProject } = useProjects((state) => state);
  const [editLabel, setEditLabel] = useState(label);
  const labels = ["To Do", "In Progress", "In Review" ,"Done"];

  useEffect(() => {
    setEditedTask((prevTask: Task) => ({
      ...prevTask,
      label: editLabel,
    }));
  }, [editLabel, setEditedTask]);


  return (
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-xs flex flex-row justify-between gap-1 items-center rounded-xl p-[5px]">
              /{editLabel} <ChevronDown size={10} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuLabel className="text-xs">
              Change Label
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={editLabel}
              onValueChange={setEditLabel}
            >
              {labels &&
                labels.map((labelItem, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={labelItem}
                    className="text-xs"
                  >
                    {labelItem}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}

export default LabelSelector;

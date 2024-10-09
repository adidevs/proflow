"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PrioritySelector({
  priority,
  setEditedTask,
}: {
  priority: string | undefined;
  setEditedTask: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [selectedPriority, setSelectedPriority] = useState(priority);

  useEffect(() => {
    setEditedTask((prev: Task) => ({
      ...prev,
      priority: selectedPriority,
    }));
  }, [selectedPriority, setEditedTask]);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`text-xs font-semibold flex flex-row justify-between gap-1 items-center rounded-xl p-[5px]  ${
              selectedPriority === "P1"
                ? `text-red-600 bg-red-200`
                : selectedPriority === "P2"
                ? `text-orange-600 bg-orange-200`
                : selectedPriority === "P3"
                ? `text-green-600 bg-green-200`
                : `text-blue-600 bg-blue-200`
            }`}
          >
            {selectedPriority}
            <ChevronDown size={10} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuLabel className="text-xs">
            Select Priority
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={selectedPriority}
            onValueChange={setSelectedPriority}
          >
            <DropdownMenuRadioItem value="P1" className="text-xs">
              P1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="P2" className="text-xs">
              P2
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="P3" className="text-xs">
              P3
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="P4" className="text-xs">
              P4
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

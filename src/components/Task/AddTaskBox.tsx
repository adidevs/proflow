"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserRound, SendHorizontal, X } from "lucide-react";
import DateTimePicker from "@/components/Task/DateTimePicker";
import LabelSelector from "@/components/Task/LabelSelector";
import AssignSelector from "@/components/Task/AssignSelector";
import PrioritySelector from "@/components/Task/PrioritySelector";
import { useTasks, useProjects } from "@/store";
import ProjectSelector from "./ProjectSelector";
import { toast } from "react-toastify";

function AddTaskBox({
  groupName,
  toggleAddTask,
  grouping
}: {
  groupName: string;
  grouping: string;
  toggleAddTask: (groupName: string) => void;

}) {


  const { projects } = useProjects((state) => state);
  const [project, setProject] = useState<Project | undefined>();
  useEffect(() => {
    if(grouping === "project"){
      const p_id = groupName.slice(groupName.lastIndexOf(" ") + 1);
      setProject(projects.find((project) => project._id === p_id));
    }
    else
      setProject(projects[0]);
    //ignore the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { addTask } = useTasks((state) => state);
  const { data: session } = useSession();
  const [newTask, setNewTask] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    label: (grouping === "label" )? groupName : "To Do",
    deadline: (grouping === "deadline" )? new Date(groupName) : new Date(),
    isCompleted: false,
    priority: (grouping === "priority" )? groupName as string as "P1" | "P2" | "P3" | "P4": "P4",
    projectId: project?._id || "",
    assignedTo:(grouping === "assignee" )?{
      name: groupName.slice(0, groupName.lastIndexOf(" ")),
      email: groupName.slice(groupName.lastIndexOf(" ") + 1),
    } : {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  });

  useEffect(() => {
    setNewTask((prevTask) => ({
      ...prevTask,
      project_id: project?._id,
    }));
  }, [project]);

  const submitNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitTask = async () => {
      const res = await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.task !== undefined) {
          addTask(data.task);
          toggleAddTask(groupName);
          toast.success("Task added successfully!");
        } else {
          toast.error("Task not added!");
        }
      }
    };
    submitTask();
  };

  const initialLabel = useMemo(() => project?.labels?.[0] || "To Do", [project]);

  return (
    <div className="border border-gray-300 shadow-lg flex flex-row rounded-sm p-1 w-[400px]">
      <div className="flex flex-col w-[95%] p-2">
        <div className="flex flex-col">
          <div className="text-sm flex flex-row justify-between items-center">
            <div>
              <input
                className="rounded-sm p-1"
                placeholder="Task Title"
                type="text"
                onChange={(e) =>
                  setNewTask((prevTask) => ({
                    ...prevTask,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <input
            placeholder="Task Description"
            className="text-sm text-gray-700 my-1 rounded-sm p-1"
            onChange={(e) =>
              setNewTask((prevTask) => ({
                ...prevTask,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-row items-center py-1 justify-between text-xs shadow-sm">
          <DateTimePicker
            deadline={newTask.deadline}
            setEditedTask={setNewTask}
          />

          {session?.user?.email === project?.owner ? (
            <AssignSelector
              assignedTo={newTask.assignedTo}
              setEditedTask={setNewTask}
              project_id={project?._id || ""}
            />
          ) : (
            <Badge className="flex flex-row items-center justify-center gap-1 text-xs font-light bg-white text-gray-600 hover:bg-slate-200">
              <UserRound size={12} />
              {project?.name}
            </Badge>
          )}
          <PrioritySelector
            priority={newTask.priority}
            setEditedTask={setNewTask}
          />
          <div className="text-black">
            <LabelSelector
              label={initialLabel}
              setEditedTask={setNewTask}
              project_id={project?._id || ""}
            />
          </div>
        </div>

        <div>
          <Button className="float-right bg-black ml-1" onClick={submitNewTask}>
            <SendHorizontal size={20} />
          </Button>
          <Button
            className="float-right bg-transparent text-slate-500 border-none shadow-none group"
            onClick={() => toggleAddTask(groupName)}
          >
            <X size={25} className="group-hover:text-white" />
          </Button>
        </div>

        <ProjectSelector project_id={project?._id} setProject={setProject} />
      </div>
    </div>
  );
}

export default AddTaskBox;

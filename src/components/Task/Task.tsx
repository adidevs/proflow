"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  AlarmClock,
  Pencil,
  X,
  SendHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DateTimePicker from "@/components/Task/DateTimePicker";
import { dateFormatter } from "@/utils/dateFormatter";
import LabelSelector from "./LabelSelector";
import AssignSelector from "./AssignSelector";
import PrioritySelector from "./PrioritySelector";
import { useProjects, useTasks } from "@/store";
import { toast } from "react-toastify";

function Task({
  task_id,
  title,
  description,
  label,
  priority,
  isCompleted,
  deadline,
  project_id,
  assignedTo,
}: {
  task_id: string | undefined;
  title: string;
  description: string;
  label: string;
  priority: "P1" | "P2" | "P3" | "P4";
  isCompleted: boolean;
  deadline: Date;
  project_id: string;
  assignedTo: { name: string; email: string };
}) {
  const { getProject } = useProjects((state) => state);
  const { updateTask, removeTask } = useTasks((state) => state);
  const project = getProject(project_id);
  const { data: session } = useSession();
  const [editTask, setEditTask] = useState(false);
  const [editedTask, setEditedTask] = useState({
    task_id: task_id,
    title: title,
    description: description,
    priority: priority,
    label: label,
    deadline: deadline,
    assignedTo: assignedTo,
  });
  const [taskCompleted, setTaskCompleted] = useState(isCompleted);

  const submitEditedTask = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const res = await fetch("/api/tasks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    });
    const data = await res.json();
    if (res.ok && data.task) {
      updateTask(data.task);
      setEditTask(!editTask);
      toast.success("Task updated successfully!");
    } else {
      toast.error("Error updating task");
    }
    setEditTask(!editTask);
  };

  const handleEditTask = () => {
    setEditTask(!editTask);
  };

  const handleDeleteTask = async () => {
    const res = await fetch("/api/tasks/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: task_id }),
    });
    const data = await res.json();
    if (res.ok && data.status === 200) {
      toast.success(data.message);
      removeTask(task_id);
    } else {
      toast.error(data.message);
    }
  };

  const handleCompleteTask = async () => {
    const res = await fetch("/api/tasks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_id: task_id,
        isCompleted: !taskCompleted,
      }),
    });
    const data = await res.json();
    if (res.ok && data.task) {
      updateTask(data.task);
      setTaskCompleted(!taskCompleted);
      toast.success("Task completed!");
    } else {
      toast.error("Error Marking Task as Completed");
    }
  };

  return (
    <div>
      {editTask ? (
        <div className="border border-gray-50 bg-slate-50 shadow-md flex flex-row rounded-sm p-1 w-[350px]">
          <div className="w-[5%] flex flex-col items-center mt-2 p-1">
            <Checkbox className="rounded-full hidden" />
          </div>
          <div className="flex flex-col w-[95%] p-2">
            <div className="flex flex-col">
              <div className="text-sm flex flex-row justify-between items-center">
                <div>
                  <input
                    className="rounded-sm p-1"
                    defaultValue={title}
                    placeholder="Task Title"
                    type="text"
                    onChange={(e) => {
                      setEditedTask((prevTask) => ({
                        ...prevTask,
                        title: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div></div>
              </div>
              <input
                defaultValue={description}
                placeholder="Task Description"
                className="text-sm text-gray-700 my-1 rounded-sm p-1"
                onChange={(e) => {
                  setEditedTask((prevTask) => ({
                    ...prevTask,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex flex-row items-center py-1 justify-between text-xs shadow-sm">
              <DateTimePicker
                deadline={deadline}
                setEditedTask={setEditedTask}
              />
              {project && session?.user.email === project?.owner ? (
                <AssignSelector
                  assignedTo={assignedTo}
                  setEditedTask={setEditedTask}
                  project_id={project._id}
                />
              ) : (
                <Badge className=" flex flex-row items-center justify-center gap-1 text-xs font-light bg-white text-gray-600 hover:bg-slate-200">
                  <UserRound size={12} />
                  {assignedTo.name}
                </Badge>
              )}
              <PrioritySelector
                priority={priority}
                setEditedTask={setEditedTask}
              />
              <div className="text-black">
                <LabelSelector
                  label={label}
                  setEditedTask={setEditedTask}
                  project_id={project?._id || ""}
                />
              </div>
            </div>
            <div>
              <Button
                className="float-right bg-black ml-1"
                onClick={(e) => submitEditedTask(e)}
              >
                <SendHorizontal size={20} />
              </Button>
              <Button
                className="float-right bg-transparent text-slate-500 border-none shadow-none"
                onClick={handleEditTask}
              >
                <X
                  size={25}
                  onClick={() => setEditTask(!editTask)}
                  className="hover:text-white"
                />
              </Button>
            </div>
            <Badge className="bg-white text-gray-600 font-light ml-2 hover:bg-white">
              # {project?.name}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="border border-gray-50 bg-white flex flex-row rounded-sm w-[350px]">
          <div className="w-[5%] flex flex-col items-center mt-2 p-1">
            <Checkbox
              className="rounded-full"
              disabled={
                session?.user.email === project?.owner
                  ? false
                  : session?.user.email === assignedTo?.email
                  ? false
                  : true
              }
              checked={taskCompleted}
              onClick={handleCompleteTask}
            />
          </div>
          <div className="flex flex-col w-[95%] p-2">
            <div className="flex flex-col">
              <div className="text-sm flex flex-row justify-between items-center px-2">
                <div>{title}</div>
                <div
                  className={`flex flex-row justify-between items-center gap-1 ${
                    session?.user.email === project?.owner
                      ? `block`
                      : session?.user.email === assignedTo?.email
                      ? `block`
                      : `hidden`
                  }`}
                >
                  <Pencil
                    onClick={handleEditTask}
                    size={15}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  />
                  {project && session?.user.email === project.owner && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Trash2
                          size={15}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-black">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your task and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="text-black">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteTask}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 px-2">{description}</div>
            </div>
            <div className="flex flex-row  py-1 justify-between text-xs text-gray-500 ">
              <Badge
                className={`font-thin flex flex-row items-center bg-white gap-1 hover:bg-slate-200 ${
                  new Date(deadline).setHours(0, 0, 0, 0) >=
                  new Date().setHours(0, 0, 0, 0)
                    ? `text-green-500`
                    : `text-red-500`
                }`}
              >
                <AlarmClock size={15} />
                {dateFormatter(deadline)}
              </Badge>
              <Badge className=" flex flex-row items-center justify-center gap-1 text-xs font-light bg-white text-gray-600 hover:bg-slate-200">
                <UserRound size={12} />
                {assignedTo?.name ? assignedTo.name : "Unassigned"}
              </Badge>
              <Badge
                className={`text-xs font-light ${
                  priority === "P1"
                    ? `text-red-600 bg-red-200`
                    : priority === "P2"
                    ? `text-orange-600 bg-orange-200`
                    : priority === "P3"
                    ? `text-green-600 bg-green-200`
                    : `text-blue-600 bg-blue-200`
                }`}
              >
                {priority}
              </Badge>
              <Badge className="text-xs font-light bg-white text-gray-600 hover:bg-slate-200">
                /{label}
              </Badge>
            </div>
            <div>
              <Badge className="bg-white text-gray-600 font-light ml-2 hover:text-white">
                # {project?.name}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;

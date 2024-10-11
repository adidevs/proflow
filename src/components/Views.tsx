"use client";
import React, { useState, useEffect, use } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useTasks } from "@/store";
import { toast } from "react-toastify";
import ListView from "./ListView";
import KanbanView from "./KanbanView";

interface OpenAddTaskState {
  [key: string]: boolean;
}

const Views = ({
  view,
  grouping,
  groupedTasks,
  sorting,
  filterProject,
}: {
  view: string;
  grouping: string;
  groupedTasks: Record<string, Task[]>;
  sorting: "asc" | "desc";
  filterProject: string;
}) => {
  const { updateTask, getTask } = useTasks((state) => state);
  const [openAddTask, setOpenAddTask] = useState<OpenAddTaskState>({});
  const toggleAddTask = (column: string) => {
    setOpenAddTask((prev) => ({
      ...prev,
      [column]: !prev[column], // Toggle the specific column's state
    }));
  };
  const columns = groupedTasks
    ? Object.keys(groupedTasks).filter(
        (group) => groupedTasks[group].length > 0
      )
    : [];

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      toast.info("Task moved to the same group");
      return;
    } else if (source.droppableId !== destination.droppableId) {
      const tasks = groupedTasks[source.droppableId];
      const [removed] = tasks.splice(source.index, 1);
      groupedTasks[destination.droppableId].splice(
        destination.index,
        0,
        removed
      );
    }

    const task = getTask(draggableId);
    //Assuming that there will be atleast one task in the destination group, or else the group won't exist
    const destinationTask = getTask(
      groupedTasks[destination.droppableId][destination.index !== 0 ? 0 : 1]._id
    );
    if (!task) return;

    let updatedTask = {};

    switch (grouping) {
      case "assignee":
        updatedTask = {
          task_id: task._id,
          assignedTo: destinationTask?.assignedTo,
        };
        break;
      case "deadline":
        // Check if task.deadline exists and is a valid Date
        const deadlineDate = task.deadline
          ? new Date(task.deadline)
          : new Date(); // Convert to Date object or use current date

        // Extract previous time (hours, minutes, seconds, milliseconds)
        const prevHours = deadlineDate.getHours();
        const prevMinutes = deadlineDate.getMinutes();
        const prevSeconds = deadlineDate.getSeconds();
        const prevMilliseconds = deadlineDate.getMilliseconds();

        // Create new Date object for destinationTask deadline
        const destinationDeadline = destinationTask?.deadline
          ? new Date(destinationTask.deadline)
          : new Date();
        // Set the preserved time on the destination deadline date
        destinationDeadline.setHours(
          prevHours,
          prevMinutes,
          prevSeconds,
          prevMilliseconds
        );

        // Update the task with the new deadline
        updatedTask = {
          task_id: task._id,
          deadline: new Date(destinationDeadline),
        };
        break;

      case "label":
        updatedTask = {
          task_id: task._id,
          label: destinationTask?.label,
        };
        break;
      case "priority":
        updatedTask = {
          task_id: task._id,
          priority: destinationTask?.priority,
        };
        break;

      default:
        break;
    }
    const updateTaskDetails = async () => {
      const res = await fetch("/api/tasks/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      if (res.ok && data.task) {
        toast.success("Task updated successfully!");
        updateTask(data.task);
      } else {
        toast.error("Error updating task");
      }
    };
    updateTaskDetails();
  };

  return (
    <div>
      {groupedTasks && columns.length === 0 && (
        <div>
          <div className="flex flex-col items-center justify-center h-96">
            <h1 className="text-2xl font-semibold">No tasks to show</h1>
            <p className="text-gray-500">Add tasks to get started</p>
          </div>
        </div>
      )}
      <div>
        {view === "list" && (
          <ListView
            groupedTasks={groupedTasks}
            grouping={grouping}
            sorting={sorting}
            handleOnDragEnd={handleOnDragEnd}
            toggleAddTask={toggleAddTask}
            openAddTask={openAddTask}
            filterProject={filterProject}
          />
        )}
        {view === "kanban" && (
          <KanbanView
            groupedTasks={groupedTasks}
            grouping={grouping}
            sorting={sorting}
            handleOnDragEnd={handleOnDragEnd}
            toggleAddTask={toggleAddTask}
            openAddTask={openAddTask}
            filterProject={filterProject}
          />
        )}
      </div>
    </div>
  );
};

export default Views;

"use client";

export const groupTasks = (
  tasks: Task[],
  grouping: string,
  getProject?: (id: string | undefined) => Project | undefined
) => {
  let groupedTasks: Record<string, Task[]>;

  switch (grouping) {
    case "project":
      groupedTasks = tasks.reduce((acc, task) => {
        const project = getProject ? getProject(task.projectId) : undefined;
        const projectName = project ? project.name + " " + task.projectId : "Unknown Project";
        if (!acc[projectName]) acc[projectName] = [];
        acc[projectName].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
      break;

    case "deadline":
      groupedTasks = tasks.reduce((acc, task) => {
        const date = task.deadline ? new Date(task.deadline).toDateString() : "No Deadline";
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
      break;

    case "label":
      groupedTasks = tasks.reduce((acc, task) => {
        const label = task.label || "No Label";
        if (!acc[label]) acc[label] = [];
        acc[label].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
      break;

    case "priority":
      groupedTasks = tasks.reduce((acc, task) => {
        const priority = task.priority;
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
      break;

    case "assignee":
      groupedTasks = tasks.reduce((acc, task) => {
        const assignedTo = task.assignedTo.name + " " + task.assignedTo.email;
        if (!acc[assignedTo]) acc[assignedTo] = [];
        acc[assignedTo].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
      break;

    default:
      return { All: tasks };
  }

  // Sort the grouped records by keys
  const sortedGroupedTasks = Object.keys(groupedTasks)
    .sort((a, b) => {
      if (grouping === "deadline" && a !== "No Deadline" && b !== "No Deadline") {
        // Compare actual date values
        return new Date(a).getTime() - new Date(b).getTime();
      }
      return a.localeCompare(b); // Alphabetical sorting for other groups
    })
    .reduce((sortedAcc, key) => {
      sortedAcc[key] = groupedTasks[key];
      return sortedAcc;
    }, {} as Record<string, Task[]>);

  return sortedGroupedTasks;
};

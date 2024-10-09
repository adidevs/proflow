"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Views from "@/components/Views";
import ViewSelector from "@/components/ViewSelector";
import { useProjects, useTasks } from "@/store";
import { groupTasks } from "@/utils/groupTasks";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

function TaskPage({
  pathName,
  pageName,
}: {
  pathName: string;
  pageName: string;
}) {
  const page = pathName.split("/")[2];
  const project_id = pathName.split("/")[3];
  const { data: session, status } = useSession();
  const { tasks, setTasksList } = useTasks((state) => state);
  const { getProject } = useProjects((state) => state);
  const project = getProject(project_id);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("kanban");
  const [grouping, setGrouping] = useState<
    "project" | "deadline" | "label" | "priority" | "assignee"
  >("priority");
  const [filterProject, setFilterProject] = useState<string>("false");
  const [sorting, setSorting] = useState<"asc" | "desc" | "false">("asc");

  const groupedTasks = groupTasks(tasks, grouping, getProject);
  useEffect(() => {
    if (project === undefined && status === "authenticated") {
      fetch("/api/tasks/user-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: session?.user.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          //filter tasks that are not completed and have deadline today
          const filteredTasks = data.tasks
            .filter((task: Task) => {
              let condition: boolean | undefined = false;
              switch (page) {
                case "today":
                  condition =
                    task.deadline &&
                    new Date(task.deadline).toDateString() ===
                      new Date().toDateString() &&
                    !task.isCompleted;
                  break;
                case "completed":
                  condition = task.isCompleted;
                  break;
                default:
                  //All tasks
                  condition = !task.isCompleted;
                  break;
              }
              if (filterProject === "false") {
                return condition;
              } else 
              condition = task.projectId === filterProject;

              return condition;
            })
            
          setTasksList(filteredTasks);
          setLoading(false);
        });
    }
    if (project !== undefined) {
      {
        fetch("/api/tasks/project-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: project_id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            //filter tasks that are not completed and have deadline today
            const filteredTasks = data.tasks;
            setTasksList(filteredTasks);
            setLoading(false);
          }).catch((err) => {
            toast.error(err.message);
          });
      }
    }
  }, [status, project]);

  return (
    <main className="mx-5 lg:mx-28">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="absolute right-4 top-4">
            <ViewSelector
              view={view}
              setView={setView}
              grouping={grouping}
              setGrouping={setGrouping}
              sorting={sorting}
              setSorting={setSorting}
              filterProject={filterProject}
              setFilterProject={setFilterProject}
            />
          </div>
          <h1 className="text-2xl font-semibold my-5">
            {project ? project.name : pageName}
          </h1>
          <div>
            <Views
              view={view}
              grouping={grouping}
              groupedTasks={groupedTasks}
              sorting={sorting}
              setSorting={setSorting}
              filterProject={filterProject}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default TaskPage;

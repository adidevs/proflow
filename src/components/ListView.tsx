import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import Task from "@/components/Task/Task";
import AddTaskBox from "@/components/Task/AddTaskBox";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ListView({
  groupedTasks,
  grouping,
  sorting,
  handleOnDragEnd,
  toggleAddTask,
  openAddTask,
  filterProject,
}: {
  groupedTasks: Record<string, Task[]>;
  grouping: string;
  sorting: string;
  handleOnDragEnd: (result: any) => void;
  toggleAddTask: (groupName: string) => void;
  openAddTask: Record<string, boolean>;
  filterProject: string;
}) {
  return (
    <div>
      <Accordion type="multiple">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {Object.entries(groupedTasks).map(([groupName, tasks]) => (
            <AccordionItem
              key={groupName}
              value={groupName}
              className={`max-w-[350px] ${
                tasks.length === 0 ? `hidden` : ``}`}
            >
              <AccordionTrigger>
                <h3 className="font-bold">
                  {
                    //Formatting the group name based on the grouping type
                    (grouping === "deadline" || grouping === "label")
                      ? groupName
                      : groupName.substring(
                          0,
                          groupName.lastIndexOf(" ") === -1
                            ? groupName.length
                            : groupName.lastIndexOf(" ")
                        )
                  }
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <StrictModeDroppable droppableId={`${groupName}`}>
                  {(provided) => (
                    <ul
                      className="tasks"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tasks
                        .filter((task) => {
                          if (filterProject === "false") {
                            return true;
                          } else return task.projectId === filterProject;
                        })
                        .sort((a, b) => {
                          const deadlineA = a.deadline
                            ? new Date(a.deadline).getTime()
                            : Infinity; // Set to infinity for tasks with no deadline
                          const deadlineB = b.deadline
                            ? new Date(b.deadline).getTime()
                            : Infinity;
    
                          // Sort ascending or descending based on `sorting`
                          if (sorting === "asc") {
                            return deadlineA - deadlineB;
                          } else {
                            return deadlineB - deadlineA;
                          }
                        })

                        .map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={`${task._id}`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <Task
                                  key={task._id}
                                  task_id={task._id}
                                  priority={task.priority}
                                  title={task.title}
                                  description={task.description || ""}
                                  label={task.label || ""}
                                  isCompleted={task.isCompleted}
                                  deadline={task.deadline || new Date()}
                                  project_id={task.projectId || ""}
                                  assignedTo={
                                    task.assignedTo || {
                                      name: "Unassigned",
                                      email: "null",
                                    }
                                  }
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </StrictModeDroppable>
              </AccordionContent>
              <div>
                {openAddTask[groupName] ? (
                  <div>
                    <AddTaskBox
                      groupName={groupName}
                      grouping={grouping}
                      toggleAddTask={() => toggleAddTask(groupName)}
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-row items-center gap-1 my-1 text-sm group text-gray-500 font-light hover:text-gray-900"
                    onClick={() => toggleAddTask(groupName)}
                  >
                    <Plus
                      size={18}
                      className="rounded-full group-hover:text-white group-hover:bg-orange-600"
                    />
                    Add task
                  </div>
                )}
              </div>
            </AccordionItem>
          ))}
        </DragDropContext>
      </Accordion>
    </div>
  );
}

export default ListView;

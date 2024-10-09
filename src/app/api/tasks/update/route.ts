import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  const { task_id, isCompleted, priority, title, description, deadline, label, assignedTo } = await req.json();

  if (!task_id && (!title || !description || !isCompleted || !deadline || !label || !assignedTo)) {
    return NextResponse.json({  
    message: "Missing required fields",
      status: 400,
    });
  }

  try {
    await dbConnect();

    const task = await Task.findById(task_id);

    if (!task) {
      return NextResponse.json({
        message: "Task not found",
        status: 404,
      });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if(priority) task.priority = priority;
    if (isCompleted !== task.isCompleted) task.isCompleted = isCompleted;
    if (deadline !== undefined) task.deadline = new Date(deadline);
    if (label) task.label = label;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();
    
    return NextResponse.json({
      message: "Task Updated",
      status: 200,
      task: task
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

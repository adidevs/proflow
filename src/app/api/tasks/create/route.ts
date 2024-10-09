import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  const { title, description, deadline, label, assignedTo, project_id, priority} = await req.json();

  if (!title || !project_id) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  try {
    await dbConnect();

    const newTask = new Task({
      title,
      description,
      deadline,
      label,
      priority,
      assignedTo,
      projectId: project_id,
    });

    await newTask.save();

    return NextResponse.json({
      message: "Task Created",
      status: 201,
      task: newTask,
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
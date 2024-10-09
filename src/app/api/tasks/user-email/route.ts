import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import Project from "@/models/Project";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  const { user_email } = await req.json();

  if (!user_email) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  try {
    await dbConnect();

    //Set query to find all tasks from all projects where user is member
    const projects = await Project.find({ "members.email": user_email });
    const project_ids = projects.map((project) => project._id);
    const tasks = await Task.find({ projectId: { $in: project_ids } })
      .populate("assignedTo", "name email") // Populate assignedTo with user details
      .lean(); // Use lean() for performance (returns plain JS objects)

    if (!tasks) {
      return NextResponse.json({
        message: "Tasks not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Tasks Found",
      status: 200,
      tasks: tasks,
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

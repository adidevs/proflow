import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import Task from "@/models/Task";
import dbConnect from "@/lib/dbConnect";
import generateTasks from "./aiTaskGenerator";

export async function POST(req: NextRequest) {
  const { name, description, owner, owner_name, generateAITasks } =
    await req.json();

  if (!name || !owner || !owner_name) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  const project_labels = ["To Do", "In Progress", "In Review", "Done"];

  try {
    await dbConnect();

    const newProject = new Project({
      name,
      description,
      owner,
      labels: project_labels,
      members: [{ name: owner_name, email: owner }],
    });

    await newProject.save();

    if (generateAITasks === true && newProject?._id) {
      const prompt = `name:${name};description:${description};isoDateString:${new Date().toISOString};projectId:${newProject._id}`;
      const generatedAITasks = await generateTasks(prompt);
      const parsedTasks = await JSON.parse(generatedAITasks);
      await Task.insertMany(parsedTasks);
    }

    return NextResponse.json({
      message: "Project Created",
      status: 201,
      project: newProject,
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

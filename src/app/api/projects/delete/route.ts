import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  const { project_id } = await req.json();

  if (!project_id) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  try {
    await dbConnect();

    await Project.findByIdAndDelete(project_id);

    return NextResponse.json({
      message: "Project Deleted",
      status: 200,
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

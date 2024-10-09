import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get("project-id");
  try {
    
    if (!project_id) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    await dbConnect();

    const project = await Project.findById(project_id);

    if (!project) {
      return NextResponse.json({
        message: "Projects not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Projects Found",
      status: 200,
      project: project,
    })
  } catch (error: any) {
    console.log("ERROR" + error.message);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

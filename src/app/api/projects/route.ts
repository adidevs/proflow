import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_email = searchParams.get("user_email");
  try {
    
    if (!user_email) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    await dbConnect();

    const projects = await Project.find({ "members.email": user_email });

    if (!projects) {
      return NextResponse.json({
        message: "Projects not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Projects Found",
      status: 200,
      projects: projects,
    });
  } catch (error: any) {
    console.log("ERROR" + error.message);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

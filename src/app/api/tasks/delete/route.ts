import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  const { task_id } = await req.json();

  if (!task_id) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  try {
    await dbConnect();

    await Task.findByIdAndDelete(task_id);

    return NextResponse.json({
      message: "Task Deleted",
      status: 200,
    });
  } catch (error) {
    console.log("ERROR" + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

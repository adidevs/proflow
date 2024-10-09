import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
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

        const tasks = await Task.find({ projectId: project_id });

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
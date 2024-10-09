import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
    const { project_id, name, email } = await req.json();

    if (!project_id || !name || !email) {
        return NextResponse.json({
            message: "Missing required fields!",
            status: 400,
        });
    }

    try {
        await dbConnect();

        const project = await Project.findById(project_id);

        if (!project) {
            return NextResponse.json({
                message: "Project not found!",
                status: 404,
            });
        }

        project.members.push({ name, email });

        await project.save();

        return NextResponse.json({
            message: "Member Added!",
            status: 200,
            project: project,
        });
    } catch (error) {
        console.log("ERROR" + error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
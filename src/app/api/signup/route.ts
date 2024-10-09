import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { sampleTasks } from "./sampleTasks";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { id, name, email, password, isVerified } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  if (isVerified == true) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await dbConnect();
      const checkUser = await User.findOne({ email });
      if (checkUser)
        return NextResponse.json({
          message: "User already exists!",
          status: 200,
        });
      const addUser = await User.create({
        _id: id,
        name,
        email,
        password: hashedPassword,
        isVerified,
      });
      // Create a default project for the user
      const project = await Project.create({
        name: "Sample Project",
        description: "This is a sample project",
        labels: ["To Do", "In Progress", "In Review", "Done"],
        owner: addUser.email,
        members: [
          { name: addUser.name, email: addUser.email },
          { name: "Sample Member", email: "sample@proflow.com" },
          { name: "John Doe", email: "john@proflow.com" },
          { name: "Jane Smith", email: "jane@proflow.com" },
          { name: "Alice Johnson", email: "alice@proflow.com" },
          { name: "Bob Lee", email: "bob@proflow.com" },
          { name: "Charlie Williams", email: "charlie@proflow.com" },
          { name: "Dave Brown", email: "dave@proflow.com" },
          { name: "Eve Davis", email: "eve@proflow.com" },
          { name: "Frank Harris", email: "frank@proflow.com" },
          { name: "Grace Martin", email: "grace@proflow.com" },
          { name: "Hank Thompson", email: "hank@proflow.com" },
          { name: "Ivy Adams", email: "ivy@proflow.com" },
          { name: "Jake Anderson", email: "jake@proflow.com" },
          { name: "Kelly Turner", email: "kelly@proflow.com" },
          { name: "Liam Scott", email: "liam@proflow.com" },
          { name: "Mia Clark", email: "mia@proflow.com" }
        ],
      });
      // Add Sample Tasks to the project
      await Task.insertMany(sampleTasks(project._id));

      //Add Sample Tasks to the project
      return NextResponse.json({
        message: "User created successfully",
        status: 200,
        user: addUser,
      });
    } catch (error) {
      console.log("ERROR: " + error);
      return NextResponse.json({
        message: "Internal Server Error",
        status: 500,
      });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await dbConnect();

    const checkUser = await User.findOne({ email });

    if (checkUser)
      return NextResponse.json({
        message: "User already exists!",
        status: 400,
      });

    const addUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const project = await Project.create({
      name: "Sample Project",
      description: "This is a sample project",
      owner: addUser.email,
      labels: ["To Do", "In Progress", "In Review", "done"],
      members: [
        { name: addUser.name, email: addUser.email },
        { name: "Sample Member", email: "sample@proflow.com" },
        { name: "John Doe", email: "john@proflow.com" },
        { name: "Jane Smith", email: "jane@proflow.com" },
        { name: "Alice Johnson", email: "alice@proflow.com" },
        { name: "Bob Lee", email: "bob@proflow.com" },
        { name: "Charlie Williams", email: "charlie@proflow.com" },
        { name: "Dave Brown", email: "dave@proflow.com" },
        { name: "Eve Davis", email: "eve@proflow.com" },
        { name: "Frank Harris", email: "frank@proflow.com" },
        { name: "Grace Martin", email: "grace@proflow.com" },
        { name: "Hank Thompson", email: "hank@proflow.com" },
        { name: "Ivy Adams", email: "ivy@proflow.com" },
        { name: "Jake Anderson", email: "jake@proflow.com" },
        { name: "Kelly Turner", email: "kelly@proflow.com" },
        { name: "Liam Scott", email: "liam@proflow.com" },
        { name: "Mia Clark", email: "mia@proflow.com" }
      ],
    });
    // Add Sample Tasks to the project
    await Task.insertMany(sampleTasks(project._id));
    return NextResponse.json({
      message: "User created successfully",
      status: 200,
      user: addUser,
    });
  } catch (error) {
    console.log("ERROR: " + error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

 
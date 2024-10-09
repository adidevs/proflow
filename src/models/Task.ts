import mongoose, { Schema, Document } from "mongoose";


export interface ITask extends Document {
    title: string;
    description: string;
    label: string;
    deadline: Date;
    isCompleted: boolean;
    priority: "P1" | "P2" | "P3" | "P4";
    assignedTo: {
      name: string;
      email: string;
    };  // Reference to the user
    projectId: Schema.Types.ObjectId;  // Reference to the project
  }
  
  // Task Schema
  const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    label: { type: String },
    deadline: { type: Date },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, default: "P4" },
    assignedTo: {
      name: { type: String, ref: "User" },
      email: { type: String, ref: "User" },
    },  // Referencing user
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true }  // Referencing project
  });

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
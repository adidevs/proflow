import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  owner: string; // Reference to the user
  labels: string[];
  members: {
    name: string;
    email: string; // Reference to the user
  }[];
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: String, ref: "User", required: true }, // Referencing owner by User ID
  labels: [{ type: String, required: true }], // Labels
  members: [
    {
      name: { type: String, ref: "User" }, // Member reference to User name
      email: { type: String, ref: "User" }, // Member reference to User email
    },
  ]
});

const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

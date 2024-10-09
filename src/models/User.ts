import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name:string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
  projects: Schema.Types.ObjectId[];  // Referencing projects by ID
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]  // Referencing projects by their ID
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

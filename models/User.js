import mongoose, { models } from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilepic: {
    type: String,
  },
  coverpic: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const User = models.User || model("User", userSchema);
export default User;
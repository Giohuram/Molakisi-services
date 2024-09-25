import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  gender: { type: String, enum: ["male", "female"] },
  phone: { type: Number },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);

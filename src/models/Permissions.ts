import mongoose from "mongoose";

const permissionsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Permissions =
  mongoose.models.Permissions ||
  mongoose.model("Permissions", permissionsSchema);

export default Permissions;

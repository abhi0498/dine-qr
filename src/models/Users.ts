import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;

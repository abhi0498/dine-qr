import mongoose, { Schema, Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  restaurant: mongoose.Types.ObjectId;
}

const BranchSchema: Schema = new Schema({
  name: { type: String, required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export default mongoose.models.Branch ||
  mongoose.model<IBranch>("Branch", BranchSchema);

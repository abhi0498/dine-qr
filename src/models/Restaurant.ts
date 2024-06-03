import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  branches: mongoose.Types.ObjectId[];
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
});

export default mongoose.models.Restaurant ||
  mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

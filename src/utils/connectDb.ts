"use server";

import { connect, connections } from "mongoose";
import loadModels from "../models/loadModels";
// Define a custom global variable
declare global {
  var models: any; // Replace 'any' with a more specific type if needed
}
const cache: any = {};

const connectDB = async () => {
  if (cache.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    await connect(process.env.MONGODB_URI!, {});
    cache.isConnected = connections[0].readyState;

    console.log("MongoDB connected");
    //load all models
    //read all files in the models folder ending in .ts
    //import each file as a model
    console.log(__dirname);

    const models = await loadModels();

    global.models = models;
  } catch (err: any) {
    console.error(err.message);
  }
};

export default connectDB;

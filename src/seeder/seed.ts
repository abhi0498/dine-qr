const connectDB = require("@/utils/connectDb").default;
console.log({ connectDB });

const path = require("path");
// seed.js
const mongoose = require("mongoose");
require("dotenv").config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDB(true);
    //read --name from the command line
    const scriptNameToRun = process.argv[2];
    if (!scriptNameToRun)
      throw new Error(
        "Please provide a script name to run as an argument. Example: npm run seed <user>"
      );

    const seedToRun = require(path.join(
      __dirname,
      `./seeds/${scriptNameToRun}`
    ));
    await seedToRun();

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

seedDatabase();

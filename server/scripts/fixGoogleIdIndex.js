// Script to drop the old googleId index and let Mongoose recreate it with partial filter
const mongoose = require("mongoose");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const User = mongoose.connection.collection("users");

    // Drop the old googleId_1 index
    try {
      await User.dropIndex("googleId_1");
      console.log("✅ Dropped old googleId_1 index");
    } catch (err) {
      console.log("⚠️  Index might not exist:", err.message);
    }

    // Let Mongoose recreate indexes with the new partial filter
    const UserModel = require("../models/User");
    await UserModel.createIndexes();
    console.log("✅ Recreated indexes with partial filter");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

run();

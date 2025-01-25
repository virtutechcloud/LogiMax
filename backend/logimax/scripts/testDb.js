const mongoose = require("mongoose");
const connectDB = require("../config/database");

async function testConnection() {
  try {
    await connectDB();

    await mongoose.connection.db.createCollection("test_collection");
    console.log("Test collection created successfully");

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Drop test collection
    await mongoose.connection.db.dropCollection("test_collection");
    console.log("Test collection dropped successfully");

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection test completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database connection test failed:", error);
    process.exit(1);
  }
}

testConnection();

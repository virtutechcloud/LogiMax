const mongoose = require("mongoose");
const config = require("./config");

const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await mongoose.connect(config.database.url, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`Database Name: ${conn.connection.name}`);

      // Connection successful - set up event handlers
      mongoose.connection.on("error", (err) => {
        console.error(`MongoDB connection error: ${err}`);
        setTimeout(() => connectWithRetry(), delay);
      });

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected. Attempting to reconnect...");
        setTimeout(() => connectWithRetry(), delay);
      });

      process.on("SIGINT", async () => {
        try {
          await mongoose.connection.close();
          console.log("MongoDB connection closed through app termination");
          process.exit(0);
        } catch (err) {
          console.error("Error during MongoDB connection closure:", err);
          process.exit(1);
        }
      });

      // Connection successful - exit the retry loop
      return;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${i + 1} failed: ${error.message}`
      );
      if (i === retries - 1) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      // Wait before trying again
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

module.exports = connectWithRetry;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/database");
const config = require("./config/config");
const mongoose = require("mongoose");
const dbStatus = require("./middleware/dbStatus.middleware");

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dbStatus);

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

// Add a health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    dbState:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Function to find an available port
const findAvailablePort = async (startPort) => {
  const net = require("net");

  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // Try the next port
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
};

// Start server with port finding
const startServer = async () => {
  try {
    const port = await findAvailablePort(config.port);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

const mongoose = require("mongoose");

const dbStatus = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: "error",
      message: "Database connection is not ready",
    });
  }
  next();
};

module.exports = dbStatus;

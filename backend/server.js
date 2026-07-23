import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    console.log(`   API base: http://localhost:${PORT}/api/v1`);
    console.log(`   Health check: http://localhost:${PORT}/api/v1/health`);
  });
};

startServer();

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});

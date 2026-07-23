import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { xssSanitizer } from "./middleware/xss.middleware.js";

import apiRoutes from "./routes/index.js";
import { errorConverter, errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Sanitize against NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xssSanitizer);

// Prevent HTTP parameter pollution
app.use(hpp());

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
}

// Global rate limiting
app.use("/api", globalLimiter);

// Routes
app.use("/api/v1", apiRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Smart Hospital Management System API", version: "1.0.0" });
});

// 404 + error handling (must be last)
app.use(notFoundHandler);
app.use(errorConverter);
app.use(errorHandler);

export default app;

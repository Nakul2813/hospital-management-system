import ApiError from "../utils/ApiError.js";

/**
 * Converts known error types (Mongoose, JWT, etc.) into ApiError,
 * then sends a consistent JSON error response.
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal server error";
    let errors = [];

    // Mongoose validation error
    if (error.name === "ValidationError") {
      statusCode = 400;
      errors = Object.values(error.errors).map((e) => e.message);
      message = "Validation failed";
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0];
      message = field ? `${field} already exists` : "Duplicate field value";
    }

    // Mongoose invalid ObjectId
    if (error.name === "CastError") {
      statusCode = 400;
      message = `Invalid ${error.path}: ${error.value}`;
    }

    error = new ApiError(statusCode, message, errors, err.stack);
  }

  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || "Internal server error",
    errors: err.errors && err.errors.length > 0 ? err.errors : undefined,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (statusCode >= 500) {
    console.error("🔥 Server Error:", err);
  }

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

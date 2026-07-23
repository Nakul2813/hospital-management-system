/**
 * Wraps an async Express route handler so rejected promises / thrown errors
 * are forwarded to the global error-handling middleware instead of crashing
 * the process or requiring try/catch in every controller.
 */
const asyncHandler = (requestHandler) => (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch(next);
};

export default asyncHandler;

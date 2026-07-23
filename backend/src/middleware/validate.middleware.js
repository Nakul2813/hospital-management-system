import ApiError from "../utils/ApiError.js";

/**
 * Validates req.body (or req.query/req.params) against a Zod schema.
 * Usage: router.post("/route", validate(schema), controller)
 */
export const validate = (schema, source = "body") => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
    return next(ApiError.badRequest("Validation failed", errors));
  }
  req[source] = result.data;
  next();
};

/**
 * Recursively strips HTML tags / script injection attempts from
 * req.body, req.query, and req.params. Replaces the unmaintained
 * `xss-clean` package with a minimal, dependency-free equivalent.
 */
const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return value
      .replace(/<script[^>]*>.*?<\/script>/gis, "")
      .replace(/<[^>]+>/g, "")
      .trim();
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === "object") {
    const clean = {};
    for (const key of Object.keys(value)) {
      clean[key] = sanitizeValue(value[key]);
    }
    return clean;
  }
  return value;
};

export const xssSanitizer = (req, res, next) => {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  // req.query is a getter-only in newer Express versions; mutate in place instead
  if (req.query) {
    const sanitizedQuery = sanitizeValue(req.query);
    for (const key of Object.keys(req.query)) delete req.query[key];
    Object.assign(req.query, sanitizedQuery);
  }
  next();
};

function notFoundHandler(req, res) { res.status(404).json({ error: "Route not found", path: req.originalUrl }); }
function errorHandler(err, _req, res, _next) { console.error(err); if (err.name === "ZodError") return res.status(400).json({ error: "Validation error", details: err.errors }); return res.status(err.status || 500).json({ error: err.message || "Internal server error" }); }
module.exports = { notFoundHandler, errorHandler };

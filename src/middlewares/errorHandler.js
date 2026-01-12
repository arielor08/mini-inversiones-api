function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const payload = { error: message };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
}

module.exports = { notFoundHandler, errorHandler };
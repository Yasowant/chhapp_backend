const notFound = (req, res, next) => {
  const error = new Error(
    `🔍 Oops! The requested URL '${req.originalUrl}' was not found on this server.`
  );
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    message: `❌ Error: ${err.message}`,
    stack:
      process.env.NODE_ENV === 'production'
        ? '📌 Stack trace hidden'
        : err.stack,
  });
};

module.exports = { notFound, errorHandler };

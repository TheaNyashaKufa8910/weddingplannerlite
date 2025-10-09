export default (err, req, res, next) => {
  console.error(err); // log for server side

  const statusCode = err.status || err.statusCode || 500;
  const response = {
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  };

  // include stack trace in development only
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

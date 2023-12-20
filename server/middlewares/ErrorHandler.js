export const notFound = (req, res, next) => {
  const error = new Error(`Router ${req.originalUrl} not found !`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    mess: error?.message,
  });
};

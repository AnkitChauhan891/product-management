const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          success: false,
          message: "Each image must be less than 2MB.",
        });

      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          success: false,
          message: "Maximum 5 images are allowed.",
        });

      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          success: false,
          message: "Unexpected file field.",
        });

      default:
        return res.status(400).json({
          success: false,
          message: err.message,
        });
    }
  }

  res.status(status).json({
    status: false,
    error: {
      code: err.code ?? "INTERNAL_SERVER_ERROR",
      message: err.message ?? "Something went wrong",
    },
  });
};

module.exports = errorHandler;

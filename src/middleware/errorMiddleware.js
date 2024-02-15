const logger = require("./loggerMiddleware");

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({
      error: err.message
    });
}

module.exports = errorHandler;
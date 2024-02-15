const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'combined.log' }) // Log to a file
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' }) // Log exceptions to a separate file
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  )
});

module.exports = logger;

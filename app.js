const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const logger = require('./src/middleware/loggerMiddleware')
const fileRoutes = require('./src/routes/fileHandleRoutes');
const errorHandler = require('./src/middleware/errorMiddleware')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api', fileRoutes);

app.use(errorHandler)

// Log uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1); // Exit the process after logging the error
  });
  
  // Log unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})
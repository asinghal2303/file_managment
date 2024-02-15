const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const logger = require('../middleware/loggerMiddleware')


exports.generateToken= (req, res, next) => {

    jwt.sign({ userId: 'AmitS' }, JWT_SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            logger.error('Error generating token:', err);
            return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.json({ token });
    });
}
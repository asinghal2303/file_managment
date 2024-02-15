const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')
    
    if(!token) {
        return res.status(401).send('Acces denied! No token found.')
    }

    try {
        const isAuthenticated = jwt.verify(token, JWT_SECRET_KEY)
        req.user = isAuthenticated;
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authenticate;
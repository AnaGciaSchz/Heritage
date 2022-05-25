const logger = require('pino')()

export default function errorHandler(err, res) {
    if (typeof (err) === 'string') {
        logger.error(err)
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        logger.error("Error: Invalid token")
        return res.status(401).json({ message: 'Invalid Token' });
    }
    logger.error(err.message)
    return res.status(500).json({ message: err.message });
}
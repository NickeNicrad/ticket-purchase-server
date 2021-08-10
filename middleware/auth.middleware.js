const jwt = require('jsonwebtoken');

const authenticated = (req, res, next) => {
    // get token
    const token = req.headers.authorization.split(" ")[1];

    // check for token
    if (!JSON.parse(token)) throw res.status(401).json('access denied! you have no authorization\nplease login and try again');
    try {
        // verify token
        const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        // add admin from payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json('invalid token');
    }
}

module.exports = authenticated;
const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {

    let authToken = req.header('auth-token');

    if (!authToken) {
        return res.status(401).send({ error: "Invalid Authentication!" });
    }
    try {
        let userData = jwt.verify(authToken, process.env.JWT_SECRET);
        req.userId = userData.id;
        next();
    } catch (err) {
        res.status(401).send({ error: "Invalid Authentication!" });
    }

};

module.exports = authenticateToken;
const jwt = require('jsonwebtoken');
const config = require('../../config/auth');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({
            error: true,
            code: 130,
            message:"Non-existent token"
        })
    }

    const [, token] = auth.split(' ')

    try {
        decoded = await promisify(jwt.verify)(token, config.secret);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Expired token"
            })

        } else {
            req.user_id = decoded.id;
            
            next();

        }

    } catch {
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Invalid token"
        })

    }


}


const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

class ValidateToken {
    constructor(secret) {
        this.secret = secret;
    }

    handle = asyncHandler(async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];

            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "User is not Authorized" });
                }
                req.user = decoded.user;
                console.log("User from token:", req.user);
                next(); 
            });
        } else {
            return res.status(401).json({ message: "User is not authorized or token is missing" });
        }
    });
}

module.exports = new ValidateToken(process.env.ACCESS_TOKEN_SECRET);



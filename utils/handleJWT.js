const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT;

const JWTSign=(user)=>{
    const sign = jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn: "2h"
    })
    return sign;
}

module.exports = {JWTSign} 
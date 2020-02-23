const jwt = require('jsonwebtoken')
const response = require('./response')
const code = require('./secretCode')

exports.authorization = (req, res, next) => {
    const token = req.get('Authorization')
    try{
        jwt.verify(token, code.jwt);
        next();
    } catch{
        response.denied(res, 'Authorization Invalid, Please Log in again')
    }
}
exports.authentication = (req, res, next) => {
    const key = req.get('Authentication')
    if(key === "123OKE"){
        next();
    }else{
        response.denied(res, 'Authentication Invalid')
    }
}
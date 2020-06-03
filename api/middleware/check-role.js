const jwt = require('jsonwebtoken')

const CheckRole = (roles) => (req,res,next) => {
    console.log('req', req)
    !roles.includes(req.body.role)
    ? res.status(401).json({
        errors: true,
        message: 'Unauthorized'
    })
    : next();
}

module.exports = CheckRole
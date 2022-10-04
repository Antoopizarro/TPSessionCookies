module.exports = (req,res,next) => {
    req.session.userLogin = req.cookies.userLogin
    next()
}
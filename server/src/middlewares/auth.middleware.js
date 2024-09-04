
function authMiddleware (req, res, next) {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'User needs to authenticate.',
        });
    }

    next();
}

module.exports = authMiddleware;


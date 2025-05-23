export function isAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'You are not authorized to view this resource' })
    };

    next();
};

export function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized to view this resource, because you are not an admin' })
    }
};
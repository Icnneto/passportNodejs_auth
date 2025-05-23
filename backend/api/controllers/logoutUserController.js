export function logoutUser(req, res, next) {
    req.logout(function (err) {
            if (err) return next(err);
            return res.status(200).json({ success: true, message: 'User logged out!' });
        }
    )
};
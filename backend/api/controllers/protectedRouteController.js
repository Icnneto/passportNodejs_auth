export function protectedRoute(req, res, next) {
    res.status(200).json({
        message: 'This is a protected route!',
        user: req.user.username
    });
};
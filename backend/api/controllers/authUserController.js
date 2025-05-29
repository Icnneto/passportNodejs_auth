import passport from "passport";

export function authenticateUser(req, res, next) {
    passport.authenticate('local', { failureMessage: true }, (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info.message || 'Authentication failed'
            });
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log(user);
            return res.status(200).json({ success: true, message: 'Succesfull login!' });
        });
    })(req, res, next);
};
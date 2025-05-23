import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../database/usersSchema.js"
import { validPassword } from "../lib/passwordUtils.js";

const customFields = {
    usernameField: 'email',
    passwordField: 'pw'
};

const verifyCallback = async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(null, false, { message: 'User not found!' })
        };

        const isValid = validPassword(password, user.hash, user.salt);

        if (!isValid) {
            return done(null, false, { message: 'Incorrect password!' });
        };

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId);
        done(null, user);
    } catch (error) {
        done(error);
    };
});
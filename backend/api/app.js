import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import router from './routes/routes.js';
import "../services/passport/passport.js";
import connection from '../database/dbConnect.js';
import { errorHandler } from './middleware/errHandler.js';

dotenv.config();

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = MongoStore.create({
    client: connection.getClient(),
    collectionName: 'sessions'
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})

/**
 * -------------- ROUTES ----------------
 */

app.use(router);
app.use(errorHandler);

export default app;
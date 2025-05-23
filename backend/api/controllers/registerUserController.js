import { genPassword } from "../../services/lib/passwordUtils.js";
import User from "../../database/usersSchema.js"

export async function registerUser (req, res, next) {
    const saltHash = genPassword(req.body.pw);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        email: req.body.email,
        hash: hash,
        salt: salt,
    });

    try {
        const userCreated = await User.create(newUser);
        console.log(userCreated);
        
        return res.status(200).json({ success: true, message: 'User succesfully created!' });
    } catch (error) {
        return res.status(500).send(`Error on creating user: ${error}`);
    };
};

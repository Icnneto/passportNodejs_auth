import mongoose from "mongoose";
import connection from "./dbConnect.js";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

const User = connection.model('users', userSchema);

export default User;
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';

dotenv.config();

const dbString = process.env.DB_CONNECTION_STRING;

const connection = mongoose.createConnection(dbString);

export default connection;
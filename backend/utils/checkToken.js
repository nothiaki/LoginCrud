import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function checkToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken(username) {
    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;
}
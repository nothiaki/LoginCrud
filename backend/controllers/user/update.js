import jwt from 'jsonwebtoken';
import { user } from '../../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

export async function update(req, res) {
    const { lastUsername } = req.params;
    const { username, email, password } = req.body;
    const token = req.headers.cookie.split('=')[1];

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifiedToken) {
            return res.status(401).json({
                "message": "You must be logged in to perform this operation"
            });
        };

        ///check if last username isnt null or undefined

        const data = await user.findOne({
            where: { username: lastUsername }
        });

        if(!data) {
            return res.status(404).json({
                "message": "User credentials not found."
            });
        }
        //verify if username or email already exist in database

        data.username = username;
        data.email = email;
        data.password = password;
        await data.save();

        return res.status(200).json({
            "message": "User credentials updated sucessfully."
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

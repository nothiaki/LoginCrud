import validator from 'validator';
import bcrypt from 'bcrypt';
import { user } from '../../models/user.js';


export async function register(req, res) {
    const { username, email, password } = req.body;

    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({
            "error_message": "Username can only contain a-z, A-Z or 0-9."
        });
    }

    if(!validator.isLength(username, { min: 2, max: 12 })) {
        return res.status(400).json({
            "error_message": " Username must be between 2-12 characters"
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            "error_message": "Type an valid email."
        });
    }

    if(!validator.isLength(password, { min: 6, max: 20 })) {
        return res.status(400).json({
            "error_message": " Password must be between 6-20 characters"
        });
    }

    if (!validator.isAlphanumeric(password)) {
        return res.status(400).json({
            "error_message": "Password must contains a-z, A-Z and 0-9."
        });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        user.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201);
    } catch (error) {
        return res.status(500).json({
            "error_message": "Internal Server Error"
        });
    }
}

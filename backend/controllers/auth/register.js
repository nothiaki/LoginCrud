import validator from 'validator';
import { user } from '../../models/user.js';
import { encryptPassword } from '../../utils/encryptPassword.js';


export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).json({
                "message": "Username can only contain a-z, A-Z or 0-9."
            });
        }

        else if(!validator.isLength(username, { min: 2, max: 12 })) {
            return res.status(400).json({
                "message": " Username must be between 2-12 characters"
            })
        }

        else if (!validator.isEmail(email)) {
            return res.status(400).json({
                "message": "Type an valid email."
            });
        }

        else if(!validator.isLength(password, { min: 6, max: 20 })) {
            return res.status(400).json({
                "message": " Password must be between 6-20 characters"
            });
        }

        else if (!validator.isAlphanumeric(password)) {
            return res.status(400).json({
                "message": "Password must contains a-z, A-Z and 0-9."
            });
        }

        user.create({
            username,
            email,
            password: encryptPassword(password)
        });

        return res.status(201);
    } catch (error) {
        return res.status(500).json({
            "message": "Internal Server Error"
        });
    }
}

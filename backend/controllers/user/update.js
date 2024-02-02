import { user } from '../../models/User.js';
import { checkToken } from '../../utils/checkToken.js';
import { encryptPassword } from '../../utils/encryptPassword.js';
import { createToken } from '../../utils/createToken.js';

export async function update(req, res) {
    const { lastUsername } = req.params;
    const { username, email, password, token } = req.body;

    try {
        if(!checkToken(token)) {
            return res.status(401).json({
                "message": "You must be logged in to perform this operation."
            });
        };

        const data = await user.findOne({
            where: { username: lastUsername }
        });

        if(!data) {
            return res.status(404).json({
                "message": "User credentials not found."
            });
        }

        data.username = username;
        data.email = email;
        data.password = encryptPassword(password);
        await data.save();

        const newToken = createToken(username);

        return res.status(200).json({
            "message": "User credentials updated sucessfully.",
            "token": newToken,
            "user": {
                "username": username,
                "email": email
            }
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

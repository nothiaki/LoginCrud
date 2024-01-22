import { user } from '../../models/User.js';
import { checkToken } from '../../utils/checkToken.js';

export async function update(req, res) {
    const { lastUsername } = req.params;
    const { username, email, password } = req.body;
    const token = req.headers.cookie.split('=')[1];

    try {
        if(!checkToken(token)) {
            return res.status(401).json({
                "message": "You must be logged in to perform this operation"
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

import { user } from '../../models/User.js';
import { checkToken } from '../../utils/checkToken.js';

export async function deleteUser(req, res) {
    const { username, token } = req.params;

    try {
        if(!checkToken(token)) {
            return res.status(401).json({
                "message": "You must be logged in to perform this operation."
            });
        }

        await user.destroy({
            where: { username }
        });

        return res.status(200).json({
            "message": "Account was deleted."
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

import { user } from '../../models/User.js';

export async function deleteUser(req, res) {
    const { username } = req.params;

    try {
        await user.destroy({
            where: { username }
        });

        return res.status(201).json({
            "message": "Account was deleted."
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

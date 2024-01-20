import { user } from '../../models/User.js';

export async function oneUser(req, res) {
    const { username } = req.params;

    try {
        const data = await user.findOne({
            where: { username },
            attributes: ['username', 'email']
        });

        return res.status(200).json({
            "user": data
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

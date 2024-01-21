import { user } from '../../models/User.js';

export async function listAllUsers(req, res) {
    try {
        const data = await user.findAll({
            attributes: ['username', 'email']
        });
        
        return res.status(200).json({
            "data": data
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

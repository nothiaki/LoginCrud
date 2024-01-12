import { user } from '../../models/user.js';

export async function listUsers(req, res) {
    try {
        const data = await user.findAll({
            attributes: ['username', 'email']
        });
        
        return res.status(201).json({
            "data": data
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}
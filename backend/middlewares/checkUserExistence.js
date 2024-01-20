import { user } from "../models/User.js";

export async function checkUserExistence(req, res, next) {
    const { username, email } = req.body;

    try {
        const query = await user.findOne({
            where: {
                username,
                email
            }
        });
        
        if(query) {
            return res.status(409).json({
                "message": "Username or email already exist."
            });
        }
    
        next();
        
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error."
        });
    }
}

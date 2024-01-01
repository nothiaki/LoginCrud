import { user } from "../models/user.js";

export async function checkUserExistence(req, res, next) {
    const { username, email } = req.body;

    const query = await user.findOne({
        where: {
            username,
            email
        }
    })
    
    if(query) {
        return res.status(409).json({
            "message": "Username or email already exist."
        });
    }

    next();
}


///add try catch
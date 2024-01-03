import { object, string } from 'yup';
import { user } from '../../models/user.js';
import { encryptPassword } from '../../utils/encryptPassword.js';


export async function register(req, res) {
    const { username, email, password } = req.body;
    
    const userSchema = object({
        username: string()
            .required('Type a valid username.')
            .min(2, 'Username must be between 2-12 characters.')
            .max(12, 'Username must be between 2-12 characters.')
            .matches('^[a-zA-Z0-9]+$', {
                message: 'Username can only contain a-z, A-Z or 0-9.'
            }),

        email: string()
            .email()
            .required('Type a valid email.'),

        password: string()
            .required('Type a valid password.')
            .min(6, 'Password must be between 6-20 characters.')
            .max(12, 'Password must be between 6-20 characters.')
            .matches('^[a-zA-Z0-9]+$', {
                message: 'Password can only contain a-z, A-Z or 0-9.'
            })
    });
    
    try {
        await userSchema.validate(req.body);

        user.create({
            username,
            email,
            password: encryptPassword(password)
        });

        return res.status(201);
    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }
}

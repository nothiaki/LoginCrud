import { object, string } from 'yup';
import { user } from '../../models/user.js';
import { encryptPassword } from '../../utils/encryptPassword.js';


export async function login(req, res) {
    const { email, password } = req.body;
    
    let userSchema = object({
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
        
        const data = user.findOne({
            where: {
                email,
                password: encryptPassword(password)
            }
        });

        if(data) {
            return res.status(201).json({
                "message": "deu tudo certo"
            });;
        }

        return res.status(500).json({
            "message": "Internal server error."
        });

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }   
}

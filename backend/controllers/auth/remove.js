import { object, string } from 'yup';
import { user } from '../../models/user.js';
import bcrypt from 'bcrypt';

export async function remove(req, res) {
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

        const data = await user.findOne({
            where: { email }
        });

        const passIsValid = bcrypt.compareSync(password, data.dataValues.password)
            
        if(passIsValid) {
            const destroy = await user.destroy({
                where: {
                    email
                }
            });

            return res.status(201).json({
                "message": "conta foi deletada patrão"
            });
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

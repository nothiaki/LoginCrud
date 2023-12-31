import bcrypt from 'bcrypt';

export function decryptPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};

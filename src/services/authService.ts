import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthService 
{
    public encryptPassword = (plaintextPassword: string) => {
        const saltRound = 10;

        return bcrypt.hashSync(plaintextPassword, saltRound);
    }

    public comparePassword = (plaintextPassword: string, hashedPassword: string) => {
        return bcrypt.compareSync(plaintextPassword, hashedPassword);
    }

    public verifyToken = (token: string) => {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    }

    public generateToken = (payload: string | object | Buffer) => {
        return jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: 36000
        })
    }
}
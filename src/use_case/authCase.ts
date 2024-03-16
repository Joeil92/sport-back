import UserRepository from "../repository/user/userRepository";
import AuthService from "../services/authService";
import { Credentials } from "../shared/types/credentials.interface";

export default class AuthCase
{
    constructor(
        private repository = new UserRepository(),
        private authService = new AuthService()
    ) {}

    public async auth(credentials: Credentials): Promise<string> {
        if(!credentials.email || !credentials.password) throw new Error('email or password cannot be empty');

        return await this.repository.findByEmail(credentials.email)
            .then(users => {
                if(!users.length) throw new Error('Incorrect email or password');

                const comparePassword = this.authService.comparePassword(credentials.password, users[0].password);

                if(!comparePassword) {
                    throw new Error('Incorrect email or password');
                }

                const payload = {
                    id: users[0].id,
                    email: users[0].email,
                    roles: users[0].roles
                };

                return this.authService.generateToken(payload);
            })
    }
}
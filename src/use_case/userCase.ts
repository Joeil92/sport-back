import User from "../model/user";
import UserRepository from "../repository/user/userRepository";
import AuthService from "../services/authService";
import { UserBody } from "../shared/types/user.interface";

export default class UserCase {
    constructor(
        private repository = new UserRepository(),
        private authService = new AuthService()
    ) { }

    public async add(user: UserBody) {
        const isFieldsMissing = (
            !user.email ||
            !user.password ||
            !user.firstname ||
            !user.lastname ||
            !user.phone
        );

        if (isFieldsMissing) {
            throw new Error('At least one field is missing');
        }

        const newUser = new User(
            null,
            user.email,
            this.authService.encryptPassword(user.password),
            user.firstname,
            user.lastname,
            user.phone,
            user.weigth || null,
            user.size || null,
            user.imageUrl || null,
            ['ROLE_USER']
        );

        return await this.repository.findByEmail(user.email)
            .then(async users => {
                if (users.length) throw new Error('Account with the given email already exist');

                return await this.repository.add(newUser)
                    .then(userPacket => {
                        return {
                            id: parseInt(userPacket.insertId),
                            email: newUser.getEmail(),
                            firstname: newUser.getFirstname(),
                            lastname: newUser.getLastname()
                        }
                    });
            });
    }

    public async findAll() {
        return await this.repository.findAll();
    }
}
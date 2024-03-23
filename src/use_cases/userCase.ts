import User from "../models/user";
import UserRepository from "../repositories/user/userRepository";
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

    public async updateAvatar(userId: string, avatar: Express.Multer.File | undefined) {
        if(!avatar) throw new Error('No file found');

        return await this.repository.findById(userId)
            .then(async users => {
                if(!users.length) throw new Error('User not found');

                return await this.repository.updateAvatar(userId, avatar.filename);
            })
    }

    public async updateSize(userId: string, size: string) {
        if(!parseInt(size)) throw new Error('Please enter a valid format');

        return await this.repository.findById(userId)
            .then(async users => {
                if(!users.length) throw new Error('User not found');

                return await this.repository.updateSize(userId, size);
            })
    }

    public async updateWeight(userId: string, weight: string) {
        if(!parseInt(weight)) throw new Error('Please enter a valid format');

        return await this.repository.findById(userId)
            .then(async users => {
                if(!users.length) throw new Error('User not found');

                return await this.repository.updateWeight(userId, weight);
            })
    }

    public async findById(userId: string) {
        return await this.repository.findById(userId)
            .then(users => {
                if(!users.length) throw new Error('User not found');

                return users[0];
            })
    }

    public async findAll() {
        return await this.repository.findAll();
    }
}
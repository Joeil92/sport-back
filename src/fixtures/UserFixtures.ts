import User from "@FitTrackr/models/user";
import Fixture from "./fixture";
import AuthService from "@FitTrackr/services/authService";
import UserRepository from "@FitTrackr/repositories/user/userRepository";
import { EntityFixture } from "./types/EntityFixture.interface";

export const nbUser = 100;

export default class UserFixtures extends Fixture implements EntityFixture
{
    constructor(
        private repository = new UserRepository(),
        private authService = new AuthService()
    ) { super() }

    public async flush(users: User[]) {
        for(const user of users) {
            try {
                await this.repository.add(user);
            } catch (error) {
                throw new Error('error: ' + error);                
            }
        }

        this.endMessage('User');
    }

    public load() {
        const faker = this.getFaker();

        const users = faker.helpers.multiple(() => this.newUser(), { count: nbUser });

        return this.flush(users);
    }

    private newUser(isAdmin = false): User {
        const faker = this.getFaker();

        const sex = faker.person.sexType();
        const firstname = faker.person.firstName(sex);
        const lastname = faker.person.lastName(sex);
        const email = isAdmin ? "admin@mon-organisation.fr" : faker.internet.email({ firstName: firstname, lastName: lastname });
        const roles = isAdmin ? ['ROLE_USER', 'ROLE_ADMIN'] : ['ROLE_USER'];

        const user = new User(
            null,
            email,
            this.authService.encryptPassword('test'),
            firstname,
            lastname,
            faker.phone.number(),
            faker.number.int({ min: 40, max: 120 }),
            faker.number.int({ min: 140, max: 210 }),
            null,
            roles
        );

        return user;
    }
}
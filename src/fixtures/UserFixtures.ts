import User from "@FitTrackr/models/user";
import Fixture from "./fixture";
import AuthService from "@FitTrackr/services/authService";
import UserRepository from "@FitTrackr/repositories/user/userRepository";

export const nbUser = 100;

export default class UserFixtures extends Fixture
{
    constructor(
        private authService = new AuthService(),
        private repository = new UserRepository()
    ) { super() }

    public async load() {
        const faker = this.getFaker();

        const users = faker.helpers.multiple(() => this.newUser(), { count: nbUser });

        await this.flush("User", this.repository, users);
    }

    private newUser(): User {
        const faker = this.getFaker();

        const sex = faker.person.sexType();
        const firstname = faker.person.firstName(sex);
        const lastname = faker.person.lastName(sex);
        const email = faker.internet.email({ firstName: firstname, lastName: lastname });

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
            ['ROLE_USER']
        );

        return user;
    }
}
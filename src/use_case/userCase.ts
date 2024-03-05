import UserRepository from "../repository/userRepository";
import AuthService from "../services/authService";

export default class UserCase
{
    constructor(
        private repository = new UserRepository(),
        private authService = new AuthService()
    ) {}

    public async add() {
        
    }
}
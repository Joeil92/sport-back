import pool from "@Sport/config/database";
import User from "@Sport/model/user";
import UserQueries from "./queries";

export default class UserRepository
{
    constructor(
        private queries = new UserQueries()
    ) {}

    public async add(user: User) {
        const connect = await pool.getConnection();
        const sql = this.queries.add;
        try {
            return await connect.query(sql, [
                user.getEmail(),
                user.getPassword(),
                user.getFirstname(),
                user.getLastname(),
                user.getPhone(),
                user.getWeigth(),
                user.getSize(),
                user.getImageUrl(),
                user.getRoles()
            ])
        } catch (error) {
            console.log(error);
            throw new Error('error to querying table : User');
        } finally {
            await connect.end();
        }
    }

    public async findByEmail(email: string) {
        const connect = await pool.getConnection();
        const sql = this.queries.findByEmail;

        try {
            return await connect.query(sql, email);
        } catch (error) {
            console.log(error);
            throw new Error('error to querying table : User');
        } finally {
            await connect.end();
        }
    }
}
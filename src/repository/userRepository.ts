import pool from "@Sport/config/database";
import User from "@Sport/model/user";
import UserQueries from "./queries";
import { UserBody } from "../shared/types/user.interface";

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

    public async findByEmail(email: string): Promise<UserBody[]> {
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

    public async findAll(): Promise<User[]> {
        const connect = await pool.getConnection();
        const sql = this.queries.findAll;

        try {
            return await connect.query(sql);
        } catch (error) {
            console.log(error);
            throw new Error('error to querying table : User');
        } finally {
            await connect.end();
        }
    }
}
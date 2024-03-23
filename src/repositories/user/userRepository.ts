import pool from "@FitTrackr/config/database";
import User from "@FitTrackr/models/user";
import UserQueries from "./queries";
import { UserBody } from "../../shared/types/user.interface";

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

    public async updateAvatar(userId: string, avatarName: string) {
        const connect = await pool.getConnection();
        const sql = this.queries.updateAvatar;

        try {
            return await connect.query(sql, [avatarName, userId]);
        } catch (error) {
            console.log(error);
            throw new Error('error to querying table : User');
        } finally {
            await connect.end();
        }
    }

    public async updateSize(userId: string, size: string) {
        const connect = await pool.getConnection();
        const sql = this.queries.updateSize

        try {
            return await connect.query(sql, [size, userId]);
        } catch (error) {
            console.log(error);
            throw new Error('error to querying table : User');
        } finally {
            await connect.end();
        }
    }

    public async updateWeight(userId: string, weight: string) {
        const connect = await pool.getConnection();
        const sql = this.queries.updateWeight

        try {
            return await connect.query(sql, [weight, userId]);
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

    public async findById(userId: string) {
        const connect = await pool.getConnection();
        const sql = this.queries.findById;

        try {
            return await connect.query(sql, userId);
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
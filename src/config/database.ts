import mariadb from "mariadb";
import dotenv from 'dotenv'; 

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
    trace: process.env.ENV === 'dev' ? true : false
});

export default pool;
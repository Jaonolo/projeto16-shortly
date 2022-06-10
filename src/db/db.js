import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL } = process.env

const { Pool } = pg;

const connectionInfo = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

export default new Pool(connectionInfo);
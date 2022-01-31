import { Pool } from "pg";

const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DB_URI;

const db = new Pool({ connectionString });

export default db;

// Base criada utilizando o serviço grátis do 'https://www.elephantsql.com/'

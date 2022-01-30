import { Pool } from "pg";

const connectionString =
  "postgres://gjoysztx:STEhWze19xHpzIpUnP0xIGA3M2JVVy9o@motty.db.elephantsql.com/gjoysztx";

const db = new Pool({ connectionString });

export default db;

// Base criada utilizando o serviço grátis do 'https://www.elephantsql.com/'

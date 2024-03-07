import { Pool } from 'pg'
 
const pgPoolPassword = process.env.PG_PWD;

const pool = new Pool({
      host: "localhost",
      port: 5432,
      database: "scr-db-2024v03",
      user: "efgarro",
      password: pgPoolPassword,
    })
 
export const query = (text, params) => pool.query(text, params);
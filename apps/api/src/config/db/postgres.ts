import { Pool } from "pg";
import dotenv from "dotenv";


dotenv.config();

if(!process.env.DATABASE_URL){
    throw new Error("Database url is not defined")
}

export const pg = new Pool({
    connectionString: process.env.DATABASE_URL
})

pg.connect()
.then((Client: any) => {
    console.log("postgress connected")
    Client.release();
})
.catch((err: any) => {
    console.error("postgres connection error", err)
    process.exit(1)
})

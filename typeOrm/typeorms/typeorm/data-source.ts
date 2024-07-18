import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config(); // carregar os valores da variavel e coenctar ao banco de dados 
const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations:[`${__dirname}/migrations/**/*.ts`]
})
export default dataSource ;

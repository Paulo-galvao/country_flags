import { Sequelize } from 'sequelize';

import "dotenv/config";

const password = process.env.PASSWORD_DB;
const database = process.env.DATABASE_NAME;
const host = process.env.HOST;

const sequelize = new Sequelize(database, 'postgres', password, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
      ssl: {
        require: true, // Importante no Railway
        rejectUnauthorized: false
      }
    }
});



export default sequelize;

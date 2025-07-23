import { Sequelize } from 'sequelize';

import "dotenv/config";

const password = process.env.PASSWORD_DB;
const database = process.env.DATABASE_NAME;
const host = process.env.HOST;

const sequelize = new Sequelize(database, 'postgres', password, {
  host,
  dialect: 'postgres',
});



export default sequelize;

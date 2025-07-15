import { Sequelize } from 'sequelize';
import "dotenv/config";

const password = process.env.PASSWORD_DB;

const sequelize = new Sequelize('flags', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;

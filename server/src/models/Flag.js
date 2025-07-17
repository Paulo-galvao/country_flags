import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Flag = sequelize.define( "Flag" , {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    continent: {
        type: DataTypes.ENUM,
        values: ['América', "Ásia", "África", "Europa", "Oceania"],
        allowNull: false,
        
    },
    population: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    capital: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flag_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: 'id'
        }
    }
});


export default Flag;
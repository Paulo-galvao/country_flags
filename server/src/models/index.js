import defineUser from "./User.js";
import defineFlag from "./Flag.js";
import sequelize from "../config/database.js";

const User = defineUser(sequelize, DataTypes);
const Flag = defineFlag(sequelize, DataTypes);


User.hasMany(Flag, { foreignKey: "user_id", as: "flags" });
Flag.belongsTo(User, { foreignKey: "user_id", as: "usuario" });

await sequelize.sync({ alter: true });

export { User, Flag };
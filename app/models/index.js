import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import userModel from "./user.model.js"; 
import roleModel from "./role.model.js"; 
import itemModel from "./item.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize)
db.role = roleModel(sequelize, Sequelize)
db.item = itemModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleID",
    otherKey: "userID",
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userID",
    otherKey: "roleID",
    as: "roles",
});

db.user.hasMany(db.item, { foreignKey: "userId", as: "itens" });
db.item.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.ROLES = ["user", "admin", "moderator"];

export default db;
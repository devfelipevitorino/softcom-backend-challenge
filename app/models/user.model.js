import { Sequelize } from "sequelize";

export default (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        cnpj: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};
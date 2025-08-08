import { Sequelize } from "sequelize";

export default (sequelize ,Sequelize) => {
    const Item = sequelize.define("items", {
        name: {
            type: Sequelize.STRING,
            Unique: true,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DECIMAL(5,2),
            allowNull: false
        }
    });

    return Item;
}
const Sequelize = require('sequelize')
const db = require('../db')

const UserProducts = db.define("UserProducts", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    productQty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

module.exports = UserProducts;
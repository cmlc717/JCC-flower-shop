const Sequelize = require('sequelize')
const db = require('../db')

const OrdersProducts = db.define("OrderProducts", {
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

module.exports = OrdersProducts;
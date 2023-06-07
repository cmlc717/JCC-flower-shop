const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    number: {
        type: Sequelize.INTEGER,
    },
    total: {
        type: Sequelize.INTEGER,
    },
    date: {
        type: Sequelize.DATE,
    },
    tax: {
        type: Sequelize.INTEGER,
    },
    shipping: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Order
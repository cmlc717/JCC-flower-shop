const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define("product", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.freepik.com/free-vector/rose-bouquet-illustration_5966833.htm#query=cartoon%20rose&position=4&from_view=search&track=ais'
    },
    price: {
        type: Sequelize.FLOAT,
    },
    description: {
        type: Sequelize.STRING,
    }, 
    quantity: {
        type: Sequelize.INTEGER
    }
});

module.exports = Product;
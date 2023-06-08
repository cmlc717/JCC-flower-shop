const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define("product", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/640px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg'
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
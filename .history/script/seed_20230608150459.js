"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db/index");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", type: "shopper", email: "cody@pug.org", address: "1 Fullstack Ave", cardNumber: 1234}),
    User.create({ username: "murphy", password: "123", type: "shopper", email: "murphy@snake.com", address: "44 Grace Hopper St", cardNumber: 55555 }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "roses",
      price: "20.00",
      description: "lots of roses",
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/valentine-s-day-red-roses-bouquet-ode-a-la-rose-550x550-37412.jpg'
    }),
    Product.create({
      name: "daisies",
      price: "10.00",
      description: "lots of daisies",      
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/therese-550x550-39701.jpg'
    }),
    Product.create({
      name: "tulips",
      price: "15.00",
      description: "lots of tulips",
      quantity: 1
    }),
    Product.create({
      name: "peonies",
      price: "30.00",
      description: "lots of peonies",
      quantity: 1,
      imageUrl: 'https://i.odealarose.com/12/images/produits/pink-peonies-and-roses-550x550-40306.jpg?_ga=2.143603317.1592709613.1686250970-469025691.1686250970'
    }),
    Product.create({ 
      name: "orchid", 
      price: "35.00", 
      description: "orchids",
      quantity: 1
    }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({ number: 1 }),
    Order.create({ number: 2 }),
    Order.create({ number: 3 }),
  ]);

  users[0].addOrder(orders[0]); //order: 1, user: cody
  products[0].addOrder(orders[0]); //product: roses and daisies
  products[1].addOrder(orders[0]);

  users[1].addOrder(orders[1]); //oder: 2, user: murphy
  products[0].addOrder(orders[1]); //product: roses and daisies
  products[1].addOrder(orders[1]);

  users[1].addOrder(orders[2]); //oder: 2, user: murphy
  products[0].addOrder(orders[2]); //product: roses

  // Adding products to users (cart)
  users[0].addProduct(products[2]);
  users[0].addProduct(products[1]);
  users[0].addProduct(products[3]);

  //updating quantity 
  products[3].update({quantity: 2});
  products[3].save();

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  seed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

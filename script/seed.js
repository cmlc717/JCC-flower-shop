'use strict'

const { db, models: {User, Product, Order} } = require('../server/db/index')
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', type: 'shopper'}),
    User.create({ username: 'murphy', password: '123', type: 'shopper'}),
  ])


  // Creating Products
  const products = await Promise.all([
    Product.create({name: 'roses', price: '20.00', description: 'lots of roses'}),
    Product.create({name: 'daisies', price: '10.00', description: 'lots of daisies'}),
  ])

  // Creating Orders
  const orders = await Promise.all([
    Order.create({number: 1}),
    Order.create({number: 2}),
    Order.create({number: 3})
  ])

  users[0].addOrder(orders[0]); //order: 1, user: cody
  products[0].addOrder(orders[0]) //product: roses and daisies
  products[1].addOrder(orders[0])

  users[1].addOrder(orders[1]); //oder: 2, user: murphy
  products[0].addOrder(orders[1]) //product: roses and daisies
  products[1].addOrder(orders[1])

  users[1].addOrder(orders[2]); //oder: 2, user: murphy
  products[0].addOrder(orders[2]) //product: roses

  users[0].addProduct(products[1]);
  
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
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
  seed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

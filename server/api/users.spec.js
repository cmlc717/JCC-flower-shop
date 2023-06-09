/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('User routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/users/', () => {

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    })
  }) // end describe('/api/users')

  describe('POST /api/users/saveMyCart/:userId', () => {
    it('POST  /api/users/saveMyCart/2', async() => {
      const res = await request(app)
        .post('/api/users/saveMyCart/2')
        .send([{createdAt: "2023-06-08T20:03:43.578Z", 
          description: "lots of roses",
          id: 1,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/640px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
          name: "roses",
          price: 20,
          updatedAt: "2023-06-08T20:03:43.578Z"}]
        ) // the HTTP request body
      
    })

  })
}) // end describe('User routes')

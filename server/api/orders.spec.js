/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { Order } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Products routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/orders/', () => {

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
    })

    it('GET /api/orders/:userId with products and product qty', async () => {
        const res = await request(app)
          .get('/api/orders/1')
          .expect(200)

        expect(res.body).to.be.an('array');
        expect(res.body[0][0].productQty).to.equal(1);
        expect(res.body[0][0].product).to.an('object');
    })

    it('GET /api/orders/orderDetails/:orderId with more information about each order', async () => {
      const res = await request(app)
        .get('/api/orders/orderDetails/1')
        .expect(200)
        
      expect(res.body).to.be.an('object');
      expect(res.body.total).to.equal(30);
  })
  }) // end describe('/api/users')
}) // end describe('User routes')

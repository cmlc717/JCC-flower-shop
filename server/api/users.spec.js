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
      expect(res.body.length).to.equal(3);
    })
  }) // end describe('/api/users')

  describe('/api/users/saveMyCart/:userId', () => {
    it('POST  /api/users/saveMyCart/2', async() => {
      const res = await request(app)
        .post('/api/users/saveMyCart/2')
        .send([[1, 1], [2, 2], [3,3]]) // the HTTP request body [id, qty]
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
    })

    it('GET  /api/users/getMyCart/2', async() => {
      const res = await request(app)
        .post('/api/users/saveMyCart/2')
        .send([[1, 1], [2, 2], [3,3]]) // the HTTP request body [id, qty]

      const res2 = await request(app)
        .get('/api/users/getMyCart/2')
        console.log(res2)
      expect(res2.body).to.be.an('array');
      expect(res2.body.length).to.equal(3);
    })
  })
}) // end describe('User routes')

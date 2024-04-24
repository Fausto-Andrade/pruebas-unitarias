require('../models')
const request = require('supertest')
const app = require('../app')
const URL_BASE = '/api/v1/directors'
const director = {
    firstName:"Chuck ",
    lastName:"Russell",
    nationality:"USA",
    image:"https://m.media-amazon.com/images/M/MV5BZGMwYmEwMDQtZjQ0My00NmRjLWJkYzYtZGY4MDRhZTA4NzJhXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
    birthday:"1958-05-09"
}
let directorId;
test("POST -> URL_BASE should return statusCode 201, and res.body.name = director.name", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(director)
        directorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
});
test("GET ALL -> URL_BASE should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});
test("GET ONE -> URL_BASE/:id should return statusCode 200, and res.body.name === director.name", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${directorId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
});
test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.name === director.name", async () => {
    const bodyUpdate = {
        firstName:"Vin",
    }
    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(bodyUpdate)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
});
test("DELETE -> URL_BASE/:id should return statusCode 204 " ,async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)
    expect(res.statusCode).toBe(204)
});
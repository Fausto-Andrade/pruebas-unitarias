require('../models');
const app = require('../app');
const request = require('supertest');
const URL_BASE = '/api/v1/actors';
const actor = {
    firstName: "Jim",
    lastName: "Carrey",
    nationality: "Canada",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jim_Carrey_2008.jpg/220px-Jim_Carrey_2008.jpg",
    birthday: "1962-17-01"
};
let actorId;
test("POST -> URL_BASE should return statusCode 201, and res.body.firstName === artor.firstName", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(actor)
        actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});
test("GET ALL -> URL_BASE should return statusCode 200, and res.body.length === 1",  async () => {
    const res = await request(app)
        .get(URL_BASE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});
test("GET ONE -> URL_BASE/:id should return statusCode 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${actorId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});
test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.firstName === bodyUpdate.firstName", async () => {
    const bodyUpdate = {
        firstName:"Ryan"
    }
    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(bodyUpdate)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
});
test("DELETE -> URL_BASE/:id, should return statusCode 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${actorId}`)
    expect(res.statusCode).toBe(204)
});
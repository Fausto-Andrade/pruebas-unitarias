require('../models');
const request = require('supertest');
const app = require('../app');
const URL_BASE = '/api/v1/movies'
const movie = {
    name:"La mascara",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Themask-logo.svg/280px-Themask-logo.svg.png",
    synpsis:"La película inicia con un buzo que lleva a cabo actividades submarinas en la costa de la ciudad, ahí accidentalmente abre una caja de metal que lleva siglos en el fondo del mar, de este sale una máscara de madera y metal que flota y es llevada por la marea hacia la ciudad",
    releaseYear:"1994"
};
let movieId
test("POST -> URL_BASE should return statusCode 201, and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)
        movieId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});
test("GET ALL-> URL_BASE should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});
test("GET ONE -> URL_BASE/:id should return statusCode 200, and  res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${movieId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});
test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.name === bodyUpdate.name", async () => {
    const bodyUpdate = {
        name:"Comedia y fantasia"
    }
    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(bodyUpdate)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
});
test("DELETED -> URL_BASE/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)
    expect(res.statusCode).toBe(204)
});
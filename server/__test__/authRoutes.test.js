import supertest from 'supertest';
import index from '../index.js';
import dotenv from "dotenv";

dotenv.config();

const request = supertest(index);

// test for registration
describe("Test the add user path", () => {
  test("It should response the bad request,because try to log without verifying captcha", async () => {
    const response = await request.post("/auth/register").send({
     name:"Test User",
     email:"testuser@gmail.com",
     username:"test_here",
     password:"Asdf1234"
    });

    expect(response.statusCode).toBe(400);
  });
});

//test for login
describe("Test the user login function endpoint.", () => {
  test("It should response the bad request,because try to log without verifying captcha", async () => {
    const response = await request.post("/auth/login").send({
     email:"testuser@gmail.com",
     password:"Asdf1234"
    });

    expect(response.statusCode).toBe(400);
  });
});
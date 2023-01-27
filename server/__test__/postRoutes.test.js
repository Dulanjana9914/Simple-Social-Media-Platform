import supertest from 'supertest';
import index from '../index.js';
import dotenv from "dotenv";

dotenv.config();

const request = supertest(index);

describe('Test the route path for get all posts',() => {
    test('It should response the GET method',async () => {
        const response = await request.get("/posts");
          expect(response.statusCode).toBe(200);
        });
    });



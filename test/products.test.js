import supertest from "supertest";
import chai from "chai";
import { generateProducts } from "../src/utils/fakerGenerator.js";
import { describe } from "mocha";

const request = supertest('http://localhost:8080/api/products')
const expect = chai.expect

describe('Product api test', () => {
    describe('GET'), () => {
        it('Should return status 200 + all products', async () => {
            let response = await request.get()
            console.log(response.status);
            console.log(response.body);
            expect(response.status).to.eql(200)
        });
        
    }
})
import supertest from "supertest";
import { generateProducts } from "../src/utils/fakerGenerator.js";
import startServer from "../src/models/server.js";
import { describe } from "mocha";
import { expect } from "chai";
import MongoClient from '../src/config/configMongo.js';
import config from "../src/config/globalConfig.js";
const client = new MongoClient(config.MONGOATLAS_URL);
import assert from "assert";

let request
let server

const mockPostProduct = {
    title: "Dying Light 1",
    description: "Use your agility and combat skills to survive, and change the fate of The City. Upgrade your Dying Light 2 Standard Edition to get the Deluxe content.",
    price: 60,
    stock: 5,
    code: "dsadas",
    category: "games",
    thumbnail: "https://i.imgur.com/zbjM3Ni.png"
};

const mockUpdateProduct = {
    price: 80,
    stock: 0,
};

describe('Product api test', function () {
    
    before(async () => {
        console.log('STARTING SERVER');
        server = startServer()
        await client.connectDb()
        request = supertest('http://localhost:8080/api/products')
    })

    describe('GET ALL PRODUCTS', () => {
        it('Should return status 200 + all products', async () => {
            let response = await request.get('/')
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(200)
        });
    })

    describe('GET SINGLE PRODUCT', () => {
        it('Should return Gamecube Controller Adapter', async () => {
            let response = await request.get('/636bd97f8b94654de74ee272')
            // console.log(response.status);
            // console.log(response.body);
            expect(response.status).to.eql(200)
        });
    })

    describe
})
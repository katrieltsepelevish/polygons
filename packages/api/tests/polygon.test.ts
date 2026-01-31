import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { Polygon } from '../src/models/Polygon';
import { createServer } from '../src/server';

let mongoServer: MongoMemoryServer;
const app = createServer();

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Polygon.deleteMany({});
});

describe('Polygon API', () => {
    it('should create a new polygon', async () => {
        const polygonData = {
            name: 'Test Polygon',
            points: [
                [0, 0],
                [10, 0],
                [10, 10],
                [0, 10],
            ],
        };

        const response = await request(app)
            .post('/polygons')
            .send(polygonData)
            .expect(201);

        expect(response.body.name).toBe(polygonData.name);
        expect(response.body.points).toEqual(polygonData.points);
        expect(response.body.id).toBeDefined();

        const savedPolygon = await Polygon.findById(response.body.id);
        expect(savedPolygon).toBeDefined();
    });

    it('should fetch all polygons', async () => {
        await Polygon.create({
            name: 'P1',
            points: [
                [1, 1],
                [2, 2],
                [3, 3],
            ],
        });
        await Polygon.create({
            name: 'P2',
            points: [
                [4, 4],
                [5, 5],
                [6, 6],
            ],
        });

        const response = await request(app).get('/polygons').expect(200);

        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('P2');
        expect(response.body[1].name).toBe('P1');
    });

    it('should delete a polygon', async () => {
        const polygon = await Polygon.create({
            name: 'To Delete',
            points: [
                [0, 0],
                [1, 1],
            ],
        });

        await request(app).delete(`/polygons/${polygon._id}`).expect(204);

        const deletedPolygon = await Polygon.findById(polygon._id);
        expect(deletedPolygon).toBeNull();
    });

    it('should return 404 when deleting not existing polygon', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        await request(app).delete(`/polygons/${fakeId}`).expect(404);
    });
});

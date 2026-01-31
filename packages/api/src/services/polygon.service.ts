import { Polygon } from '../models/Polygon';

export const polygonService = {
    async getAll() {
        return Polygon.find().sort({ createdAt: -1 });
    },

    async create(name: string, points: [number, number][]) {
        return Polygon.create({ name, points });
    },

    async delete(id: string) {
        return Polygon.findByIdAndDelete(id);
    },
};

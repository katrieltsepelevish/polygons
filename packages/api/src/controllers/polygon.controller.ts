import { Request, Response } from 'express';

import { polygonService } from '../services/polygon.service';

export const polygonController = {
    getAll: async (_req: Request, res: Response) => {
        const polygons = await polygonService.getAll();
        res.json(
            polygons.map((p) => ({
                id: p._id,
                name: p.name,
                points: p.points,
            })),
        );
    },

    create: async (req: Request, res: Response) => {
        const { name, points } = req.body;

        if (!name || !points) {
            return res
                .status(400)
                .json({ error: 'Name and points are required' });
        }

        const polygon = await polygonService.create(name, points);
        res.status(201).json({
            id: polygon._id,
            name: polygon.name,
            points: polygon.points,
        });
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await polygonService.delete(id as string);
        if (!result) {
            return res.status(404).json({ error: 'Polygon not found' });
        }
        res.status(204).send();
    },
};

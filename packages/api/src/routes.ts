import { Router } from 'express';

import { polygonController } from './controllers/polygon.controller';

const router = Router();

router.get('/polygons', polygonController.getAll);
router.post('/polygons', polygonController.create);
router.delete('/polygons/:id', polygonController.delete);

export default router;

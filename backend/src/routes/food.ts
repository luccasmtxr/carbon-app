import { Router } from 'express';
import { calculateFood } from '../controllers/foodController';

const router = Router();

router.post('/', calculateFood);

export default router;

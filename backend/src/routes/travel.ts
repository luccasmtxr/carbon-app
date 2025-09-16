import { Router } from 'express';
import { calculateTravel } from '../controllers/travelController';

const router = Router();

router.post('/', calculateTravel);

export default router;

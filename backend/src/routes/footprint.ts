import { Router } from 'express';
import { calculateFootprint } from '../controllers/footprintController';

const router = Router();

router.post('/', calculateFootprint);

export default router;

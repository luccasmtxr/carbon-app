import { Router } from 'express';
import { calculateHousing } from '../controllers/housingController';

const router = Router();

router.post('/', calculateHousing);

export default router;

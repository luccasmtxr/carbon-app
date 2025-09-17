import { Router } from 'express';
import { calculateProducts } from '../controllers/productsController';

const router = Router();

router.post('/', calculateProducts);

export default router;

import { Router } from 'express';
import { calculateServices } from '../controllers/servicesController';

const router = Router();

router.post('/', calculateServices);

export default router;

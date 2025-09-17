import { Request, Response } from 'express';
import { ServicesCalculator } from '../services/servicesService';

const calculator = new ServicesCalculator();

export function calculateServices(req: Request, res: Response) {
  try {
    const total = calculator.calculate(req.body);
    res.json({ services_footprint: total });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

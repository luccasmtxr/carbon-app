import { Request, Response } from 'express';
import { HousingCalculator } from '../services/housingService';

const calculator = new HousingCalculator();

export function calculateHousing(req: Request, res: Response) {
  try {
    const total = calculator.calculate(req.body);
    res.json({ housing_footprint: total });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

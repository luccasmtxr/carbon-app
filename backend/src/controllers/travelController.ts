import { Request, Response } from 'express';
import { TravelCalculator } from '../services/travelService';

const calculator = new TravelCalculator();

export function calculateTravel(req: Request, res: Response) {
  try {
    const total = calculator.calculate(req.body);
    res.json({ travel_footprint: total });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

import { Request, Response } from 'express';
import { FootprintCalculator } from '../services/footprintService';

const calculator = new FootprintCalculator();

export function calculateFootprint(req: Request, res: Response) {
  try {
    const result = calculator.calculate(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

import { Request, Response } from 'express';
import { FoodCalculator } from '../services/foodService';

const calculator = new FoodCalculator();

export function calculateFood(req: Request, res: Response) {
  try {
    const total = calculator.calculate(req.body);
    res.json({ food_footprint: total });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

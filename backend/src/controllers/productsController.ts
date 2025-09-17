import { Request, Response } from 'express';
import { ProductsCalculator } from '../services/productsService';

const calculator = new ProductsCalculator();

export function calculateProducts(req: Request, res: Response) {
  try {
    const total = calculator.calculate(req.body);
    res.json({ products_footprint: total });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

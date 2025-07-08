import type { Request, Response, NextFunction } from 'express'

export const getLandmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: 'Landmarks 🌏' })
}

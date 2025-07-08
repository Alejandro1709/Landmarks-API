import type { Request, Response, NextFunction } from 'express'

export const globalErrorMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  res.status(500).json({ message: 'Internal Server Error' })
}

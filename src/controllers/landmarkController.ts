import type { Request, Response, NextFunction } from 'express'
import { createLandmarkSchema } from '../schemas/landmarkSchema'
import Landmark from '../models/Landmark'
import AppError from '../utils/AppError'

export const getLandmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landmarks = await Landmark.find()

    res.status(200).json(landmarks)
  } catch (error) {
    next(error)
  }
}

export const getLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landmark = await Landmark.findById(req.params.id)

    if (!landmark) {
      return next(new AppError('This landmark does not exists', 404))
    }

    res.status(200).json(landmark)
  } catch (error) {
    next(error)
  }
}

export const createLandmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = createLandmarkSchema.parse(req.body)

    const landmark = new Landmark(body)

    await landmark.save()

    res.status(201).json({ message: 'Landmark created 🌏' })
  } catch (error) {
    next(error)
  }
}
